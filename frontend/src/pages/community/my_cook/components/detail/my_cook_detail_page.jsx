import { MyCookDetailListLoadingWrapper } from "../../styles/list/list_style";
import { useFetchDetail } from "../../../../../hooks/useFetch";
import Comments from "../../../../../common/components/comments/comments";
import RecipeListLoadingSpinner from "../../../../Recipe/List/components/recipe_list_loading_spinner";
import { useSelector } from "react-redux";
import useDeleteMyCook from "../../../../../hooks/my_cook/useDeleteMyCook";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
} from "@mui/material";
import ReadOnlyEditor from "../../../../../common/components/read_only_editor";
import MyCookWriteBtn from "../write/components/my_cook_write_btn";
import { Success } from "../../../../../common/components/sweatAlert";
import RecipeListItem from "../../../../Recipe/List/components/recipe_list_item";
import CommentContainer from "../../../FreeBoard/Detail/components/free_board_detail_comments_container";
import { useNavigate } from "react-router";
import useWidthQuery from "../../../../../hooks/Main/useWidthQuery";

export const MyCookDetail = ({ postId, openDetail, modalClose }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.account);

  const [sm, m, xl] = useWidthQuery();

  const { isLoading, isError, data, error } = useFetchDetail({
    queryKey: "myCookDetail",
    articleId: postId,
    uri: "/community/gallery/detail/",
  });

  const profileTransitionHandler = () => {
    navigate("/profile", { state: data.data.user.email });
  };

  const { mutate } = useDeleteMyCook("myCookPosts");

  if (isLoading) {
    return (
      <MyCookDetailListLoadingWrapper>
        <RecipeListLoadingSpinner loading={isLoading} />
      </MyCookDetailListLoadingWrapper>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const style = {
    maxWidth: "85%",
    maxHeight: "85%",
    overflowY: "scroll",
    msOverflowStyle: "none",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    pt: 1,
    px: 1,
    pb: 1,
  };

  return (
    <Modal
      open={openDetail}
      onClose={modalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "960px",
        mx: "auto",
      }}
    >
      <Card
        sx={{
          ...style,
          p: 3,
        }}
      >
        {/* writer and post date */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardHeader
            avatar={
              <Avatar
                src={data.data.user.img_url}
                sx={{
                  width: 60,
                  height: 60,
                  border: "2px solid #E38B29",
                }}
              />
            }
            sx={{ p: 0 }}
            title={data.data.user.nickname}
            onClick={profileTransitionHandler}
            subheader={new Date(data.data.created_at).toLocaleString()}
          />

          {/* referenced recipe */}
          {sm && (
            <Box
              sx={{
                display: "flex",
                justifyContent: sm ? "center" : "flex-start",
              }}
            >
              {data.data.recipe && (
                <RecipeListItem
                  isMyCook={true}
                  recipe={data.data.recipe}
                  onClick={() => {
                    navigate(`/recipe/postId=${data.data.recipe.id}`);
                  }}
                />
              )}
            </Box>
          )}
        </Box>

        {!sm && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.data.recipe && (
              <RecipeListItem
                isMyCook={true}
                recipe={data.data.recipe}
                onClick={() => {
                  navigate(`/recipe/postId=${data.data.recipe.id}`);
                }}
              />
            )}
          </Box>
        )}

        <CardMedia
          component="img"
          height="50%"
          image={data.data.img_url}
          alt="이미지"
          sx={{ mt: 2 }}
        />

        <CardContent>
          <ReadOnlyEditor HTML={data.data.content}></ReadOnlyEditor>
        </CardContent>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {userInfo.email === data.data.user.email && (
            <MyCookWriteBtn
              btnText={"삭제"}
              onClick={() => {
                mutate(
                  { uri: "/community/gallery/", article_id: postId },
                  {
                    onSuccess: () => {
                      Success("삭제가 완료되었습니다");
                      modalClose();
                    },
                  }
                );
              }}
            />
          )}
        </Box>

        <CommentContainer>
          <Comments
            aiButton={false}
            postId={postId}
            uri={"community/gallery/comment/"}
            queryKey="myCookComments"
          />
        </CommentContainer>
      </Card>
    </Modal>
  );
};

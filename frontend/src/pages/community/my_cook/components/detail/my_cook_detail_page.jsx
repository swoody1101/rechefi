import {
  MyCookDetailContentWithCommentWrapper,
  MyCookDetailListLoadingWrapper,
} from "../../styles/list/list_style";
import { useFetchDetail } from "../../../../../hooks/useFetch";
import Comments from "../../../../../common/components/comments/comments";
import RecipeListLoadingSpinner from "../../../../Recipe/List/components/recipe_list_loading_spinner";
import { useSelector } from "react-redux";
import useDeleteMyCook from "../../../../../hooks/my_cook/useDeleteMyCook";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export const MyCookDetail = ({ postId, openDetail, modalClose }) => {
  const userInfo = useSelector((store) => store.account);

  const { isLoading, isError, data, error } = useFetchDetail({
    queryKey: "myCookDetail",
    articleId: postId,
    uri: "/community/gallery/detail/",
  });

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
      }}
    >
      <Card
        sx={{
          ...style,
        }}
      >
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
          title={data.data.user.nickname}
          subheader={data.data.created_at}
          action={
            <IconButton aria-label="settings">
              {userInfo.auth && (
                <DeleteForeverOutlinedIcon
                  onClick={() => {
                    mutate(
                      { uri: "/community/gallery/", article_id: postId },
                      {
                        onSuccess: () => {
                          modalClose();
                        },
                      }
                    );
                  }}
                />
              )}
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="50%"
          image={data.data.img_url}
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.data.content}
          </Typography>
        </CardContent>
        <MyCookDetailContentWithCommentWrapper>
          <Comments
            aiButton={false}
            postId={postId}
            uri={"community/gallery/comment/"}
            queryKey="myCookComments"
          />
        </MyCookDetailContentWithCommentWrapper>
      </Card>
    </Modal>
  );
};

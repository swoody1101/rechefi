import { useEffect } from "react";
import {
  MyCookDetailContent,
  MyCookDetailContentWithCommentWrapper,
  MyCookDetailImage,
  MyCookDetailImageWrapper,
  MyCookDetailListLoadingWrapper,
  MyCookDetailWrapper,
} from "../../styles/list/list_style";
import { createPortal } from "react-dom";
import { useFetchDetail } from "../../../../../hooks/useFetch";
import Comments from "../../../../../common/components/comments/comments";
import RecipeListLoadingSpinner from "../../../../Recipe/List/components/recipe_list_loading_spinner";
import { useSelector } from "react-redux";
import useDeleteMyCook from "../../../../../hooks/my_cook/useDeleteMyCook";

export const MyCookDetail = ({ postId, modalClose }) => {
  const userInfo = useSelector((store) => store.account);
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

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
  console.log(data);
  console.log(userInfo);
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return createPortal(
    <MyCookDetailWrapper>
      <MyCookDetailImageWrapper>
        <MyCookDetailImage
          src={data.data.img_url}
          alt="이미지"
        ></MyCookDetailImage>
        <MyCookDetailContent>{data.data.content}</MyCookDetailContent>
        <button
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
        >
          삭제하기
        </button>
      </MyCookDetailImageWrapper>
      <MyCookDetailContentWithCommentWrapper>
        <Comments
          aiButton={false}
          postId={postId}
          uri={"community/gallery/comment/"}
          queryKey="myCookComments"
        />
      </MyCookDetailContentWithCommentWrapper>
    </MyCookDetailWrapper>,
    document.getElementById("myCookDetail")
  );
};

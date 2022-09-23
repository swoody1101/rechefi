import { useEffect } from "react";
import {
  MyCookDetailContent,
  MyCookDetailContentWithCommentWrapper,
  MyCookDetailImage,
  MyCookDetailImageWrapper,
  MyCookDetailWrapper,
} from "../../styles/list/list_style";
import { createPortal } from "react-dom";
import { useFetchDetail } from "../../../../../hooks/useFetch";
import Comments from "../../../../../common/components/comments/comments";

export const MyCookDetail = ({ postId }) => {
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

  if (isLoading) {
    return <div>로딩중...</div>;
  }
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
      </MyCookDetailImageWrapper>
      <MyCookDetailContentWithCommentWrapper>
        <Comments
          aiButton={false}
          postId={postId}
          uri={"community/gallery/comment/"}
        />
      </MyCookDetailContentWithCommentWrapper>
    </MyCookDetailWrapper>,
    document.getElementById("myCookDetail")
  );
};

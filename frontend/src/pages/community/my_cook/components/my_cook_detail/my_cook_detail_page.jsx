import { useEffect, useState } from "react";
import {
  MyCookDetailContent,
  MyCookDetailContentWithCommentWrapper,
  MyCookDetailImage,
  MyCookDetailImageWrapper,
  MyCookDetailWrapper,
} from "../my_cook_list/list_style";
import { createPortal } from "react-dom";
import RecipeDetailComments from "../../../../Recipe/recipe_detail/comments";
import { useQuery } from "react-query";
import http from "../../../../../utils/http-commons";

const fetchMyCookDetail = async (param) => {
  const res = await http.get(`/community/gallery/detail/1`);
  return res.data;
};

export const MyCookDetail = ({ postId }) => {
  const [post, setPost] = useState({
    id: postId,
    title: "",
    likes: 0,
    date: "",
    member_id: 0,
    member_nickname: "",
    comments: [],
    image_url: "",
  });
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
  const { isLoading, isError, data, error } = useQuery(
    "myCookDetail",
    fetchMyCookDetail,
    {
      onSuccess: (data) => {
        console.log(data.data);
        const temp = data.data;
        setPost({
          id: postId,
          title: temp.title,
          likes: temp.like_users,
          date: temp.create_at,
          member_id: temp.user_id,
          member_nickname: temp.nickname,
          comments: temp.comments,
          image_url: temp.img_url,
          views: temp.views,
          content: temp.content,
        });
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );
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
          src={post.image_url}
          alt="이미지"
        ></MyCookDetailImage>
      </MyCookDetailImageWrapper>
      <MyCookDetailContentWithCommentWrapper>
        <MyCookDetailContent>{post.content}</MyCookDetailContent>
        <RecipeDetailComments aiButton={false} />
      </MyCookDetailContentWithCommentWrapper>
    </MyCookDetailWrapper>,
    document.getElementById("myCookDetail")
  );
};

import { useEffect } from "react";
import { useState } from "react";
import { dummyItems } from "./dummyItems";
import {
  MyCookGridButton,
  MyCookGridImage,
  MyCookGridLi,
  MyCookGridUl,
  MyCookGridUlWrapperDiv,
  MyCookGridWrapper,
} from "./list_style";
import { useInView } from "react-intersection-observer";
import { MyCookDetail } from "../my_cook_detail/my_cook_detail_page";
import { Backdrop } from "../../../../../common/styles/sidebar_styles";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchPostList = async (pageParam) => {
  const res = await axios.get(
    `http://localhost:8000/community/gallery/{article_id}?cooking_id=${pageParam}`
    // `https://j7b303.p.ssafy.io/api/community/gallery/{article_id}?cooking_id=${pageParam}`
  );
  return {
    result: res.data,
    nextPage: pageParam + 100,
    isLast: res.data.isLast,
  };
};
const MyCookList = () => {
  const [imageState, setImageState] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [postId, setPostId] = useState(0);
  const [ref, inView] = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "myCookPosts",
    ({ pageParam = 1 }) => fetchPostList(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );
  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, inView]);
  if (status === "loading") return <div>로딩중</div>;
  return (
    <MyCookGridWrapper>
      {openDetail && (
        <div>
          <MyCookDetail postId={postId} />
          <Backdrop
            onClick={() => {
              setOpenDetail(false);
            }}
          />
        </div>
      )}
      <MyCookGridUlWrapperDiv>
        {data.pages.map((page, index) => (
          <MyCookGridUl key={index}>
            {Object.keys(page.result.data).map((e, i) => (
              <MyCookGridLi key={i}>
                <MyCookGridImage
                  src={page.result.data[e].img_url}
                  alt="test"
                  onClick={() => {
                    setOpenDetail((prev) => {
                      return !prev;
                    });
                    setPostId(page.result.data[e].user_id);
                  }}
                ></MyCookGridImage>
              </MyCookGridLi>
            ))}
          </MyCookGridUl>
        ))}
        <div ref={ref}></div>
      </MyCookGridUlWrapperDiv>
    </MyCookGridWrapper>
  );
};

export default MyCookList;

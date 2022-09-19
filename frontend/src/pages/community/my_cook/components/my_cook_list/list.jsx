import { useEffect } from "react";
import { useState } from "react";
import { dummyItems } from "./dummyItems";
import {
  MyCookGridButton,
  MyCookGridImage,
  MyCookGridLi,
  MyCookGridUl,
  MyCookGridWrapper,
} from "./list_style";
import { useInView } from "react-intersection-observer";
import { MyCookDetail } from "../my_cook_detail/my_cook_detail_page";
import { Backdrop } from "../../../../../common/styles/sidebar_styles";
import http from "../../../../../utils/http-commons";
import { useInfiniteQuery } from "react-query";

const fetchPostList = async (pageParam) => {
  const res = await http.get(
    `/community/gallery/{article_id}?cooking_id=${pageParam}`
  );
  console.log(res.data.data);
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
  useEffect(() => {
    if (inView) {
      // console.log("첫 로딩 이후 테슽");
      // let temp = [];
      // setTimeout(() => {
      //   for (let i = 0; i < 300; i++) {
      //     temp.push(dummyItems[i % 10]);
      //   }
      //   setImageState(temp);
      // }, 5000);
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  console.log(data);
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
      <MyCookGridUl>
        {data.pages.map((page, index) => (
          <MyCookGridLi key={index}>
            {Object.keys(page.result.data).map((e, i) => (
              <MyCookGridImage
                src={page.result.data[e].img_url}
                key={i}
                alt="test"
                onClick={() => {
                  setOpenDetail((prev) => {
                    return !prev;
                  });
                  setPostId(page.result.data[e].user_id);
                }}
              ></MyCookGridImage>
            ))}
          </MyCookGridLi>
        ))}
        <div ref={ref}></div>
      </MyCookGridUl>
    </MyCookGridWrapper>
  );
};

export default MyCookList;

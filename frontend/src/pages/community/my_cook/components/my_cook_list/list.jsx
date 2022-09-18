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
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchPostList = async (pageParam) => {
  const res = await axios.get(
    `http://localhost:8000/community/gallery/{article_id}?cooking_id=${pageParam}`
  );
  console.log(res);
  return {
    result: res.data,
    nextPage: pageParam + 1,
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
  console.log(data, status, isFetchingNextPage);
  // useEffect(() => {
  //   if (imageState.length === 0) {
  //     console.log("처음으로 로딩");
  //     let temp = imageState;
  //     for (let i = 0; i < 100; i++) {
  //       temp.push(dummyItems[i % 10]);
  //     }
  //     setImageState(temp);
  //     return;
  //   }
  // }, []);

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
        {imageState.map((e, i) => (
          <MyCookGridLi key={i}>
            <MyCookGridImage
              src={e.image_url}
              alt="test"
              onClick={() => {
                setOpenDetail((prev) => {
                  return !prev;
                });
                setPostId(e.id);
              }}
            ></MyCookGridImage>
          </MyCookGridLi>
        ))}
        <div ref={ref}></div>
      </MyCookGridUl>
    </MyCookGridWrapper>
  );
};

export default MyCookList;

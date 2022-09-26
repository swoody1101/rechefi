import { useEffect } from "react";
import { useState } from "react";
import {
  MyCookGridButton,
  MyCookGridImage,
  MyCookGridLi,
  MyCookGridUl,
  MyCookGridUlWrapperDiv,
  MyCookGridWrapper,
} from "../../styles/list/list_style";
import { useInView } from "react-intersection-observer";
import { MyCookDetail } from "../detail/my_cook_detail_page";
import { Backdrop } from "../../../../../common/styles/sidebar_styles";
import useFetchList from "../../../../../hooks/useFetch";

const MyCookList = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchList({
    queryKey: "myCookPosts",
    articleId: 1,
    uri: `/community/gallery/`,
  });
  const [openDetail, setOpenDetail] = useState(false);
  const [postId, setPostId] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);
  if (isLoading) return <div>로딩중</div>;
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
            {Object.keys(page.result.data.posts).map((e, i) => (
              <MyCookGridLi key={i}>
                <MyCookGridImage
                  src={page.result.data.posts[e].img_url}
                  alt="test"
                  onClick={() => {
                    setOpenDetail((prev) => {
                      return !prev;
                    });
                    setPostId(page.result.data[e].id);
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

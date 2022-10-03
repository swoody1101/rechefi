import { useEffect } from "react";
import { useState } from "react";
import {
  MyCookDetailListLoadingWrapper,
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
import RecipeListLoadingSpinner from "../../../../Recipe/List/components/recipe_list_loading_spinner";

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
  }, [inView]);

  const modalClose = () => {
    setOpenDetail(false);
  };

  if (isLoading)
    return (
      <MyCookDetailListLoadingWrapper>
        <RecipeListLoadingSpinner loading={isLoading} />
      </MyCookDetailListLoadingWrapper>
    );
  return (
    <MyCookGridWrapper>
      {openDetail && (
        <div>
          <MyCookDetail postId={postId} modalClose={modalClose} />
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
                    setPostId(page.result.data.posts[e].id);
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

import { ImageList, ImageListItem } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMyCookThunk } from "../../../../store/module/recipeReducer";
import { MyCookDetail } from "../../../community/my_cook/components/detail/my_cook_detail_page";
import { Backdrop } from "../../../../common/styles/sidebar_styles";

const ProfileGalleryMyCookList = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [myCookList, setMyCookList] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [postId, setPostId] = useState(0);

  window.addEventListener("scroll", () => {
    const val = window.innerHeight + window.scrollY;
    if (val >= document.body.offsetHeight) {
      if (page < totalPage) {
        setPage(page + 1);
      }
    }
  });

  useEffect(() => {
    const param = {
      page: page,
      mid: props.userId,
    };
    if (param.mid !== undefined) {
      dispatch(loadMyCookThunk(param))
        .unwrap()
        .then((res) => {
          setTotalPage(res.total_pages);
          res.posts.map((r) => {
            setMyCookList((myCookList) => {
              return [
                ...myCookList,
                { id: r.id, title: r.title, img_url: r.img_url },
              ];
            });
          });
        })
        .catch((err) => {
          alert("잘못된 요청입니다.");
          console.log(err);
        });
    }
  }, [props.userId, page]);

  const modalOpen = () => {
    setOpenDetail(true);
  };
  const modalClose = () => {
    setOpenDetail(false);
  };

  return (
    <>
      {openDetail && (
        <div>
          <MyCookDetail
            postId={postId}
            openDetail={openDetail}
            modalClose={modalClose}
          />
          <Backdrop
            onClick={() => {
              setOpenDetail(false);
            }}
          />
        </div>
      )}
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
        {myCookList ? (
          myCookList.map((myCook) => (
            <ImageListItem
              key={myCook.id}
              onClick={() => {
                modalOpen();
                setPostId(myCook.id);
              }}
            >
              <img
                src={`${myCook.img_url}?w=248&fit=crop&auto=format`}
                srcSet={`${myCook.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={myCook.title}
                loading="lazy"
              />
            </ImageListItem>
          ))
        ) : (
          <></>
        )}
      </ImageList>
    </>
  );
};

export default ProfileGalleryMyCookList;

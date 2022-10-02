import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMyCookThunk } from "../../../../store/module/recipeReducer";

const ProfileGalleryMyCookList = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [myCookList, setMyCookList] = useState([]);

  useEffect(() => {
    const param = {
      page: page,
      mid: props.userId,
    };
    if (param.mid !== undefined) {
      dispatch(loadMyCookThunk(param))
        .unwrap()
        .then((res) => {
          setMyCookList(res.post);
          setTotalPage(res.total_pages);
        })
        .catch((err) => {
          alert("잘못된 요청입니다.");
          console.log(err);
        });
    }
  }, [props.userId]);

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight="130">
      {myCookList ? (
        myCookList.map((myCook) => (
          <ImageListItem key={myCook.id}>
            <img
              src={`${myCook.img_url}?w=248&fit=crop&auto=format`}
              srcSet={`${myCook.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={myCook.title}
              loading="lazy"
              onClick={() => {}}
            />
            <ImageListItemBar
              title={myCook.title}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${myCook.title}`}
                />
              }
            />
          </ImageListItem>
        ))
      ) : (
        <></>
      )}
    </ImageList>
  );
};

export default ProfileGalleryMyCookList;

import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadRecipeThunk } from "../../../../store/module/recipeReducer";

const ProfileGalleryRecipeList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [recipeList, setRecipeList] = useState([]);

  const onRecipeItemClicked = (id) => {
    navigate(`/recipe/postId=` + id);
  };

  useEffect(() => {
    const param = {
      page: page,
      mid: props.userId,
    };

    if (param.mid !== undefined) {
      dispatch(loadRecipeThunk(param))
        .unwrap()
        .then((res) => {
          if (recipeList) {
            setRecipeList([...recipeList, res.post]);
          }
          setRecipeList(res.post);
          setTotalPage(res.total_pages);
        })
        .catch((err) => {
          alert("잘못된 요청입니다.");
          console.log(err);
        });
    }
  }, [props.userId, page]);

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight="130">
      {recipeList ? (
        recipeList.map((recipe) => (
          <ImageListItem
            key={recipe.id}
            onClick={() => onRecipeItemClicked(recipe.id)}
          >
            <img
              src={`${recipe.img_url}?w=248&fit=crop&auto=format`}
              srcSet={`${recipe.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={recipe.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={recipe.title}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${recipe.title}`}
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

export default ProfileGalleryRecipeList;

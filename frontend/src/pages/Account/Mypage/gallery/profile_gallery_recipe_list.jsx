import { ImageList, ImageListItem } from "@mui/material";
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

  window.addEventListener("scroll", () => {
    const val = window.innerHeight + window.scrollY;

    if (val >= document.body.offsetHeight) {
      if (page < totalPage) {
        setPage(page + 1);
      }
    }
  });

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
          setTotalPage(res.total_pages);
          res.post.map((r) => {
            setRecipeList((recipeList) => {
              return [
                ...recipeList,
                { id: r.id, title: r.title, img_url: r.img_url },
              ];
            });
            console.log(recipeList);
          });
          console.log(recipeList);
        })
        .catch((err) => {
          alert("잘못된 요청입니다.");
          console.log(err);
        });
    }
  }, [props.userId, page]);

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
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
          </ImageListItem>
        ))
      ) : (
        <></>
      )}
    </ImageList>
  );
};

export default ProfileGalleryRecipeList;

import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import RecipeList from "../../../../Recipe/List/components/recipe_list";
import {
  RecipeListModal,
  RecipeListSearchWrapper,
  RecipeListWrapper,
} from "../../styles/write/write_styles";
import SearchIcon from "@mui/icons-material/Search";
import useFetchList from "../../../../../hooks/useFetch";

const RecipeModal = ({ onRecipeItemClicked }) => {
  const { data, isLoading } = useFetchList({
    queryKey: "searchRecipeList",
    articleId: 1,
    uri: `/recipe/`,
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchWordOnChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const searchWordHandler = () => {
    console.log(searchKeyword);
  };
  if (isLoading) return <div>로딩중</div>;

  return createPortal(
    <RecipeListModal>
      <RecipeListWrapper>
        <RecipeListSearchWrapper>
          <TextField
            onChange={searchWordOnChange}
            id="search"
            label="Search"
            variant="standard"
            sx={{ width: "80%" }}
          />
          <SearchIcon
            fontSize="large"
            sx={{ marginTop: "5%" }}
            onClick={searchWordHandler}
          />
        </RecipeListSearchWrapper>
        <RecipeList
          recipes={data.pages[0].result.data}
          loading={isLoading}
          onRecipeItemClicked={onRecipeItemClicked}
        />
      </RecipeListWrapper>
    </RecipeListModal>,
    document.getElementById("myCookDetail")
  );
};

export default RecipeModal;

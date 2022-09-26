import React from "react";
import RecipeListFab from "../../Recipe/List/components/recipe_list_fab";
import MyCookList from "./components/list/list";
import { useNavigate } from "react-router-dom";

const MyCook = () => {
  const navigate = useNavigate();

  return (
    <div>
      <RecipeListFab
        onClick={() => {
          navigate("/community/write");
        }}
      ></RecipeListFab>
      <MyCookList />
    </div>
  );
};

export default MyCook;

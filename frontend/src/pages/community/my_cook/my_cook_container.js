import React from "react";
import RecipeListFab from "../../Recipe/List/components/recipe_list_fab";
import MyCookList from "./components/list/list";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyCook = () => {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.account.auth);

  return (
    <div>
      {auth && (
        <RecipeListFab
          onClick={() => {
            navigate("/community/write");
          }}
        ></RecipeListFab>
      )}
      <MyCookList />
    </div>
  );
};

export default MyCook;

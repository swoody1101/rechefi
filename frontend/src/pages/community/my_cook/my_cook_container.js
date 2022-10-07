import React from "react";
import RecipeListFab from "../../Recipe/List/components/recipe_list_fab";
import MyCookList from "./components/list/list";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReponsiveContainer from "../../../common/components/responsive_container";
import TitleWithDivider from "../../../common/components/title_with_divider";

const MyCook = () => {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.account.auth);

  return (
    <ReponsiveContainer>
      {auth && (
        <RecipeListFab
          onClick={() => {
            navigate("/community/write");
          }}
        ></RecipeListFab>
      )}
      <TitleWithDivider
        textVariant={"h5"}
        title="요리 자랑"
        style={{ px: 1, pt: 3 }}
      ></TitleWithDivider>
      <MyCookList />
    </ReponsiveContainer>
  );
};

export default MyCook;

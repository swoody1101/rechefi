import { useState } from "react";
import { Backdrop } from "../../../../common/styles/sidebar_styles";
import {
  RecipeListSearchResultButton,
  RecipeListSearchWithResultDiv,
  WriteWrapper,
} from "../styles/write_styles";
import RecipeModal from "./recipe_modal";

const MyCookWriter = () => {
  const [searchModal, setSearchModal] = useState(false);

  return (
    <WriteWrapper>
      {searchModal && (
        <div>
          <RecipeModal />
          <Backdrop
            onClick={() => {
              setSearchModal(false);
            }}
          />
        </div>
      )}
      <RecipeListSearchWithResultDiv>
        <RecipeListSearchResultButton
          onClick={() => {
            setSearchModal((prev) => {
              return !prev;
            });
          }}
        >
          레시피 검색
        </RecipeListSearchResultButton>
      </RecipeListSearchWithResultDiv>
    </WriteWrapper>
  );
};

export default MyCookWriter;

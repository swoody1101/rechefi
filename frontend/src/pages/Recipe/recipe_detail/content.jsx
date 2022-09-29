import { useLocation } from "react-router-dom";
import { useFetchDetail } from "../../../hooks/useFetch";
import {
  RecipeDetailContentElementDiv,
  RecipeDetailContentImage,
} from "../styles/recipe_detail_styles";

const RecipeDetailContent = ({ content }) => {
  return (
    <div>
      {content.split("```").map((e, i) => (
        <div key={i}>
          {e.slice(0, 3) === "<p>" ? (
            <RecipeDetailContentElementDiv>
              <div dangerouslySetInnerHTML={{ __html: e }}></div>
            </RecipeDetailContentElementDiv>
          ) : (
            <RecipeDetailContentElementDiv>
              <RecipeDetailContentImage src={e} alt="이미지" />
            </RecipeDetailContentElementDiv>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeDetailContent;

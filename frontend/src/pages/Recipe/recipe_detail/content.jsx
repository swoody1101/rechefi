import { RecipeDetailContentElementDiv } from "../styles/recipe_detail_styles";

const RecipeDetailContent = ({ content }) => {
  return (
    <div>
      {content.split("```").map((e, i) => (
        <div key={i}>
          {e.slice(0, 4) === "<img" ? (
            <RecipeDetailContentElementDiv>
              <div dangerouslySetInnerHTML={{ __html: e }}></div>
            </RecipeDetailContentElementDiv>
          ) : (
            <RecipeDetailContentElementDiv
              dangerouslySetInnerHTML={{ __html: e }}
            >
              {console.log(e)}
            </RecipeDetailContentElementDiv>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeDetailContent;

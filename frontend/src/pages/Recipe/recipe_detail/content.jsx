import { useLocation } from "react-router-dom";
import { useFetchDetail } from "../../../hooks/useFetch";
import { RecipeDetailContentElementDiv } from "../styles/recipe_detail_styles";

const RecipeDetailContent = ({ content }) => {
  const location = useLocation();
  console.log(location.state.postId);
  const postId = location.state.postId;
  const { data, isLoading } = useFetchDetail({
    queryKey: "recipeDetail",
    articleId: postId,
    uri: "/recipe/detail/",
  });
  console.log(data);
  return (
    <div>
      {data.data.recipe.content.split("```").map((e, i) => (
        <div key={i}>
          {e.slice(0, 3) === "<p>" ? (
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

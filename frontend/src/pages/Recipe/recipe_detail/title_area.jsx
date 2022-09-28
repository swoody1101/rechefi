import {
  RecipeDateAreaDiv,
  RecipeTitleAreaWrapperDiv,
  RecipeTitleTitleAreaDiv,
  RecipeWriterAreaDiv,
  RecipeWriterDateAreaDiv,
} from "../styles/recipe_detail_styles";

const RecipedetailTitleArea = ({ post }) => {
  const createAt = post.date.slice(0, 10) + " / " + post.date.slice(11, 18);
  console.log();
  return (
    <RecipeTitleAreaWrapperDiv>
      <RecipeTitleTitleAreaDiv>{post.title}</RecipeTitleTitleAreaDiv>
      <RecipeWriterDateAreaDiv>
        <RecipeWriterAreaDiv>{post.member_nickname}</RecipeWriterAreaDiv>
        <RecipeDateAreaDiv>{createAt}</RecipeDateAreaDiv>
      </RecipeWriterDateAreaDiv>
    </RecipeTitleAreaWrapperDiv>
  );
};

export default RecipedetailTitleArea;

import {
  RecipeDateAreaDiv,
  RecipeTitleAreaWrapperDiv,
  RecipeTitleTitleAreaDiv,
  RecipeWriterAreaDiv,
  RecipeWriterDateAreaDiv,
} from "../styles/recipe_detail_styles";

const RecipedetailTitleArea = ({ post }) => {
  console.log()
  return (
    <RecipeTitleAreaWrapperDiv>
      <RecipeTitleTitleAreaDiv>{post.title}</RecipeTitleTitleAreaDiv>
      <RecipeWriterDateAreaDiv>
        <RecipeWriterAreaDiv>{post.member_nickname}</RecipeWriterAreaDiv>
        <RecipeDateAreaDiv>{post.date}</RecipeDateAreaDiv>
      </RecipeWriterDateAreaDiv>
    </RecipeTitleAreaWrapperDiv>
  );
};

export default RecipedetailTitleArea;

import {
  RecipeDateAreaDiv,
  RecipeTitleAreaWrapperDiv,
  RecipeTitleTitleAreaDiv,
  RecipeWriterAreaDiv,
  RecipeWriterDateAreaDiv,
} from "../recipe_detail_styles/styles";

const RecipedetailTitleArea = ({ post }) => {
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

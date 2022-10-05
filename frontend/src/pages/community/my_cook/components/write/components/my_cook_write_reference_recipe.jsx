import TitleWithDivider from "../../../../../../common/components/title_with_divider";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Palette } from "../../../../../../common/styles/palette";
import RecipeListItem from "../../../../../Recipe/List/components/recipe_list_item";

function MyCookWriteReferenceRecipe({ onClick, referenceRecipe }) {
  return (
    <>
      <TitleWithDivider
        title={"사용된 레시피"}
        textVariant="h6"
        style={{ mt: 2 }}
        icon={
          <PostAddIcon sx={{ color: Palette.black3, fontSize: "1.9rem" }} />
        }
        onClick={onClick}
      />
      {referenceRecipe && <RecipeListItem recipe={referenceRecipe} />}
    </>
  );
}

export default MyCookWriteReferenceRecipe;

import { Box, Divider, Typography } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";
import RecipeListFilterTagChip from "../../../List/components/filter/tag/recipe_list_filter_tag_item";

function RecipeDetailTags({ tags }) {
  return (
    <>
      <Typography
        fontSize={"1rem"}
        fontWeight="bold"
        sx={{ color: Palette.black2 }}
      >
        태그
      </Typography>
      <Divider />

      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, mb: 3, rowGap: 1 }}>
        {tags.map((ele, i) => (
          <RecipeListFilterTagChip key={i} tag={{ ...ele, selected: true }} />
        ))}
      </Box>
    </>
  );
}

export default RecipeDetailTags;

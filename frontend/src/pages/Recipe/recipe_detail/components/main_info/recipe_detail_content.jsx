import { Box } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";
import { RecipeDetailContentImage } from "../../../styles/recipe_detail_styles";

function RecipeDetailContent({ content }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        background: Palette.mainColor1,
      }}
    >
      {content.split("```").map((e, i) => (
        <Box key={i}>
          {e.slice(0, 3) === "<p>" ? (
            <Box sx={{ display: "flex", p: 1, flexWrap: "wrap" }}>
              <div dangerouslySetInnerHTML={{ __html: e }}></div>
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <RecipeDetailContentImage src={e} alt="이미지" />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default RecipeDetailContent;

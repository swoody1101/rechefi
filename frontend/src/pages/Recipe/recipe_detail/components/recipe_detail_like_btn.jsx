import { IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

function RecipeDetailLikeBtn({ onClick, isLike, likes }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        mt: 3,
        mb: 1,
        display: "flex",
        alignItems: "center",
        border: 1,
      }}
    >
      {isLike ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
      <Typography fontSize={"1.1rem"} fontWeight={"bold"} sx={{ ml: 1.8 }}>
        {likes}
      </Typography>
    </IconButton>
  );
}

export default RecipeDetailLikeBtn;

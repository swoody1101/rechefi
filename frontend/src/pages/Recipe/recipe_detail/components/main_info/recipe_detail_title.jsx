import { Box } from "@mui/material";
import TitleWithDivider from "../../../../../common/components/title_with_divider";
import DetailPostInfo from "../../../../community/FreeBoard/Detail/components/free_board_detail_post_info";

const RecipedetailTitleArea = ({ post }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: "100%", mt: 3 }}
    >
      <TitleWithDivider title={post.recipe.title} textVariant={"h5"} />
      <DetailPostInfo
        userNickname={post.user.nickname}
        userEmail={post.user.email}
        postDate={post.recipe.created_at}
        postViews={post.recipe.views}
        style={{ display: "flex", justifyContent: "space-between" }}
      />
    </Box>
  );
};

export default RecipedetailTitleArea;

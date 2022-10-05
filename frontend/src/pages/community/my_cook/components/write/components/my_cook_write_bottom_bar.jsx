import { Box } from "@mui/material";
import { Palette } from "../../../../../../common/styles/palette";
import RecipeWriteBottombarButton from "../../../../../Recipe/Write/components/bottombar/recipe_write_bottombar_btn";

const WriteButtonBar = ({ onConfirm, onCancel, confirmDisabled }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        my: 2,
      }}
    >
      <RecipeWriteBottombarButton
        color={Palette.mainColor4}
        onClick={onConfirm}
        disabled={confirmDisabled}
      >
        완료
      </RecipeWriteBottombarButton>
      <RecipeWriteBottombarButton color={Palette.gray3} onClick={onCancel}>
        취소
      </RecipeWriteBottombarButton>
    </Box>
  );
};

export default WriteButtonBar;

import { Box } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";
import RecipeWriteBottombarButton from "../../../../Recipe/Write/components/bottombar/recipe_write_bottombar_btn";

const WriteButtonBar = ({ onConfirm, onCancel, confirmDisabled }) => {
  return (
    <Box
      sx={{
        width: "80%",
        m: 3,
        display: "flex",
        justifyContent: "space-between",
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

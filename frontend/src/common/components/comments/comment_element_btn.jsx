import { Button } from "@mui/material";
import { Palette } from "../../styles/palette";

function CommentElementBtn({ children, onClick }) {
  return (
    <Button
      size="small"
      sx={{
        px: 1,
        fontSize: "0.8rem",
        textDecoration: "underline",
        color: Palette.mainColor5,
        borderColor: Palette.mainColor5,
        minWidth: 0,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CommentElementBtn;

import { Button, Typography } from "@mui/material";
import { Palette } from "../../../../../../common/styles/palette";

function MyCookWriteBtn({ btnText, icon, onClick }) {
  return (
    <Button
      variant="outlined"
      sx={{
        p: 0.8,
        borderColor: Palette.black2,
        color: Palette.black2,
        "&:focus, &:hover": {
          color: Palette.white2,
          backgroundColor: Palette.gray3,
          borderColor: Palette.gray3,
        },
        "&.MuiButton-root": {
          px: 0,
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Typography fontSize={"0.8rem"} fontWeight={"bold"}>
        {btnText}
      </Typography>
    </Button>
  );
}

export default MyCookWriteBtn;

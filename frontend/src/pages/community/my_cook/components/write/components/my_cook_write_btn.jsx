import { Button, Typography } from "@mui/material";
import { Palette } from "../../../../../../common/styles/palette";

function MyCookWriteBtn({ btnText, icon }) {
  return (
    <Button
      variant="outlined"
      sx={{
        p: 1,
        borderColor: Palette.black2,
        color: Palette.black2,
        "&:focus, &:hover": {
          color: Palette.white2,
          backgroundColor: Palette.gray3,
          borderColor: Palette.gray3,
        },
      }}
    >
      {icon}
      <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
        {btnText}
      </Typography>
    </Button>
  );
}

export default MyCookWriteBtn;

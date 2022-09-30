import { Button, Typography } from "@mui/material";

function Logo({ sm, onClick }) {
  return (
    /* logo */
    <Button color={"inherit"} onClick={onClick}>
      <Typography
        fontSize={sm ? 32 : 20}
        fontWeight={"bold"}
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        Rechef
      </Typography>
    </Button>
  );
}

export default Logo;

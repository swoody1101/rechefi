import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Logo({ sm, onClick, leftShift }) {
  return (
    /* logo */
    <Link
      component={RouterLink}
      to="/"
      color="inherit"
      underline="none"
      sx={{ mr: 2 }}
    >
      <Typography fontSize={sm ? 32 : 20} fontWeight={"bold"}>
        RECHEFI
      </Typography>
    </Link>
  );
}

Logo.defaultProps = {
  leftShift: false,
};

export default Logo;

import { Divider, ListSubheader, Typography } from "@mui/material";

function SidebarContentSubheader({ text, fontSize }) {
  return (
    <>
      <Divider />
      <ListSubheader sx={{ mt: 2, mb: 0.6 }}>
        <Typography fontSize={fontSize} fontWeight={"bold"}>
          {text}
        </Typography>
      </ListSubheader>
    </>
  );
}

export default SidebarContentSubheader;

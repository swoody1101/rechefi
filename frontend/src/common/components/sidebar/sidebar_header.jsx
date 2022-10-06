import { Box, Divider, IconButton } from "@mui/material";

function SideBarHeader({ icon, onClick }) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClick}>{icon}</IconButton>
      </Box>
      <Divider />
    </>
  );
}

export default SideBarHeader;

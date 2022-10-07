import { Box, Divider, IconButton } from "@mui/material";

function SideBarFooter({ icon, onClick }) {
  return (
    <>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1, pr: 1 }}>
        <IconButton onClick={onClick}>{icon}</IconButton>
      </Box>
    </>
  );
}

export default SideBarFooter;

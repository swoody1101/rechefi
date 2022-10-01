import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SideBarHeader({ sidebarClose }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton onClick={sidebarClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default SideBarHeader;

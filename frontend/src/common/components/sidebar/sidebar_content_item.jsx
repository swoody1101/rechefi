import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Palette } from "../../styles/palette";

function SidebarContentItem({ icon, text, textSize, textBold, onClick }) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <Typography
          fontSize={textSize}
          sx={{ color: Palette.black2 }}
          fontWeight={textBold ? "bold" : ""}
        >
          {text}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}

SidebarContentItem.defaultProps = {
  textBold: true,
};

export default SidebarContentItem;

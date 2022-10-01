import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SidebarBoardDiv,
  SideBarCommunityDivWrapper,
  SideBarCommunityElementDiv,
  SidebarLogout,
  SidebarRecipeElement,
} from "../../styles/sidebar_styles";
import SidebarMyAccount from "./sidebar_my_account";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const SidebarElementList = ({ sidebarClose }) => {
  const loginInfo = useSelector((store) => store.account);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {/* user Avatar */}
      <SidebarMyAccount sidebarClose={sidebarClose} />

      <List sx={{ flexGrow: 1 }}>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/recipe");
            sidebarClose();
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            레시피
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SidebarElementList;

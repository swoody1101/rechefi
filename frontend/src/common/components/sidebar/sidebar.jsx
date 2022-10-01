import { SwipeableDrawer } from "@mui/material";
import useWidthQuery from "../../../hooks/Main/useWidthQuery";
import SideBarHeader from "./sidebar_header";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../../../store/module/accountReducer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import SidebarContent from "./sidebar_content.jsx";
import SideBarFooter from "./sidebar_footer";

const SideBar = ({ anchor, sidebarClose }) => {
  // for logout action
  const dispatch = useDispatch();

  const [sm, m, xl] = useWidthQuery();
  const sidebarWidth = xl ? "28%" : m ? "36%" : sm ? "72%" : "72%";
  const icon_size = xl ? "large" : m ? "medium" : "small";

  return (
    <SwipeableDrawer
      transitionDuration={500}
      anchor={"left"}
      open={anchor}
      onOpen={() => {}}
      onClose={sidebarClose}
      PaperProps={{
        sx: { width: sidebarWidth },
      }}
    >
      <SideBarHeader icon={<CloseIcon />} onClick={sidebarClose} />
      <SidebarContent sidebarClose={sidebarClose} />
      <SideBarFooter
        icon={<LogoutIcon fontSize={icon_size} />}
        onClick={() => {
          dispatch(logout());
        }}
      />
    </SwipeableDrawer>
  );
};

export default SideBar;

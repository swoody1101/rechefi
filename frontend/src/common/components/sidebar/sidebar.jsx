import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/module/accountReducer";
import useWidthQuery from "../../../hooks/Main/useWidthQuery";
import SideBarHeader from "./sidebar_header";
import SidebarContent from "./content/sidebar_content.jsx";
import SideBarFooter from "./sidebar_footer";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = ({ anchor, sidebarClose }) => {
  // for logout action
  const dispatch = useDispatch();

  // for checking login
  const loginInfo = useSelector((store) => store.account);

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
      <SidebarContent
        isLogin={loginInfo.auth}
        userEmail={loginInfo.email}
        sidebarClose={sidebarClose}
      />
      {loginInfo.auth ? (
        <SideBarFooter
          icon={<LogoutIcon fontSize={icon_size} />}
          onClick={() => {
            dispatch(logout());
          }}
        />
      ) : (
        ""
      )}
    </SwipeableDrawer>
  );
};

export default SideBar;

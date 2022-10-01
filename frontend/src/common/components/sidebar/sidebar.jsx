import { SwipeableDrawer } from "@mui/material";
import useWidthQuery from "../../../hooks/Main/useWidthQuery";
import SidebarElementList from "./sidebar_list";

const SideBar = ({ anchor, sidebarClose }) => {
  const [sm, m, xl] = useWidthQuery();
  const sidebarWidth = xl ? "28%" : m ? "36%" : sm ? "72%" : "72%";

  return (
    <SwipeableDrawer
      transitionDuration={500}
      anchor={"left"}
      open={anchor}
      onClose={sidebarClose}
      PaperProps={{
        sx: { width: sidebarWidth },
      }}
    >
      <SidebarElementList sidebarClose={sidebarClose} />
    </SwipeableDrawer>
  );
};

export default SideBar;

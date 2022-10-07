import { Box } from "@mui/material";
import { useState } from "react";
import useWidthQuery from "../../hooks/Main/useWidthQuery";
import { LayoutStyledMain } from "../styles/layout_styles/main-layout-styled-header-styles";
import Header from "./header/Main_header";
import SideBar from "./sidebar/sidebar";

const Layout = (props) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sm, m, lg] = useWidthQuery();

  return (
    <div>
      <SideBar
        anchor={openSideBar}
        sidebarClose={() => {
          setOpenSideBar(false);
        }}
      />
      <Header
        sidebarHandler={() => {
          setOpenSideBar(true);
        }}
      />
      <Box sx={{ mt: sm ? 8 : 8 }}>{props.children}</Box>
    </div>
  );
};

export default Layout;

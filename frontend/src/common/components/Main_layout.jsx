import { useState } from "react";
import { LayoutStyledMain } from "../styles/layout_styles/main-layout-styled-header-styles";
import Header from "./header/main_header";
import SideBar from "./sidebar/sidebar";

const Layout = (props) => {
  const [openSideBar, setOpenSideBar] = useState(false);

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
      <LayoutStyledMain>{props.children}</LayoutStyledMain>
    </div>
  );
};

export default Layout;

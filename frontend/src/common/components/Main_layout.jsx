import { useState } from "react";
import { LayoutStyledMain } from "../styles/layout_styles/main-layout-styled-header-styles";
import Header from "./header/main_header";
import SideBar from "./sidebar/sidebar";

const Layout = (props) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSidebar = () => {
    setOpenSideBar((prev) => {
      return !prev;
    });
  };
  const sidebarClose = () => {
    setOpenSideBar(false);
  };
  return (
    <div>
      <SideBar anchor={openSideBar} sidebarClose={sidebarClose} />
      <Header sidebarHandler={toggleSidebar} />
      <LayoutStyledMain>{props.children}</LayoutStyledMain>
    </div>
  );
};

export default Layout;

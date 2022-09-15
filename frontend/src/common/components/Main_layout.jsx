import { useState } from "react";
import { LayoutStyledMain } from "../styles/layout_styles/main-layout-styled-header-styles";
import Header from "./Main_header";
import SideBar from "./sidebar/sidebar";

const Layout = (props) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const sidebarHandler = () => {
    setOpenSideBar((prev) => {
      return !prev;
    });
  };
  const sidebarClose = () => {
    setOpenSideBar(false);
  };
  return (
    <div>
      {openSideBar ? <SideBar sidebarClose={sidebarClose} /> : null}
      <Header sidebarHandler={sidebarHandler} />
      <LayoutStyledMain>{props.children}</LayoutStyledMain>
    </div>
  );
};

export default Layout;

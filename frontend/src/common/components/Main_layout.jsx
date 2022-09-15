import { useState } from "react";
import { LayoutStyledMain } from "../styles/layout_styles";
import Header from "./header";
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

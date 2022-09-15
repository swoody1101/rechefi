import MenuIcon from "@mui/icons-material/Menu";
import { LayoutStyledHeader } from "../styles/layout_styles/main-layout-styled-header-styles";
import { SideBarOpenButton } from "../styles/sidebar_styles";

const Header = ({ sidebarHandler }) => {
  const openSidebarHandler = () => {
    sidebarHandler();
  };
  return (
    <LayoutStyledHeader>
      <SideBarOpenButton onClick={openSidebarHandler}>
        <MenuIcon />
      </SideBarOpenButton>
    </LayoutStyledHeader>
  );
};

export default Header;

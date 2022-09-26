import MenuIcon from "@mui/icons-material/Menu";
import {
  LayoutHeaderLogo,
  LayoutSearchInput,
  LayoutSearchInputWrapper,
  LayoutSearchParent,
  LayoutSearchWrapper,
  LayoutStyledHeader,
} from "../styles/layout_styles/main-layout-styled-header-styles";
import { SideBarOpenButton } from "../styles/sidebar_styles";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Header = ({ sidebarHandler }) => {
  console.log(process.env.REACT_APP_URL);
  const [openSearch, setOpenSearch] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  const openSidebarHandler = () => {
    sidebarHandler();
  };
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsMain(true);
      setOpenSearch(false);
    } else {
      setIsMain(false);
      setOpenSearch(false);
    }
  }, [location.pathname]);
  const openSearchBar = () => {
    setOpenSearch((prev) => {
      return !prev;
    });
  };

  return (
    <LayoutStyledHeader>
      <SideBarOpenButton onClick={openSidebarHandler}>
        <MenuIcon sx={matches ? { fontSize: 30 } : { fontSize: 40 }} />
      </SideBarOpenButton>
      {isMain ? (
        <LayoutSearchParent>
          {openSearch ? (
            <LayoutSearchWrapper>
              <LayoutSearchInputWrapper>
                <LayoutSearchInput></LayoutSearchInput>
                <ClearIcon onClick={openSearchBar} sx={{ fontSize: 40 }} />
              </LayoutSearchInputWrapper>
              <SearchIcon sx={{ fontSize: 40 }} />
            </LayoutSearchWrapper>
          ) : (
            <LayoutSearchWrapper onClick={openSearchBar}>
              <LayoutHeaderLogo>B303</LayoutHeaderLogo>
              <SearchIcon sx={{ fontSize: 40 }}></SearchIcon>
            </LayoutSearchWrapper>
          )}
        </LayoutSearchParent>
      ) : (
        <h1>B303</h1>
      )}
    </LayoutStyledHeader>
  );
};

export default Header;

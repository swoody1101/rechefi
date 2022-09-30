import MenuIcon from "@mui/icons-material/Menu";
import {
  LayoutHeaderLogo,
  LayoutSearchInput,
  LayoutSearchInputWrapper,
  LayoutSearchParent,
  LayoutSearchWrapper,
  LayoutStyledHeader,
} from "../../styles/layout_styles/main-layout-styled-header-styles";
import { SideBarOpenButton } from "../../styles/sidebar_styles";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Fade,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Palette } from "../../styles/palette";
import Logo from "./logo";

const Header = ({ sidebarHandler }) => {
  const navigate = useNavigate();

  //
  const [hiddenSearchBtn, setHiddenSearchBtn] = useState(false);

  const sm = useMediaQuery("(min-width:768px)");
  const m = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const xl = useMediaQuery("only screen and (min-width: 1025px)");

  // list of shown recipe search
  const location = useLocation();

  useEffect(() => {
    const search_shown_path = [
      "/",
      "/community/my-cook",
      "/community/write",
      "/community/community",
    ];

    search_shown_path.forEach((path) => {
      if (location.pathname === path) {
      }
    });
  }, [location.pathname]);

  return (
    <AppBar position="static" sx={{ background: Palette.mainColor4 }}>
      <Toolbar sx={{ px: 1, py: 0, justifyContent: "space-between" }}>
        {/* sidebar control */}
        <IconButton
          color="inherit"
          onClick={() => {
            sidebarHandler();
          }}
          sx={{ mr: 1 }}
        >
          <MenuIcon sx={{ fontSize: sm ? 44 : 32 }} />
        </IconButton>

        {/* logo */}
        <Logo
          sm={sm}
          onClick={() => {
            navigate("/");
          }}
        />

        <IconButton color="inherit">
          <SearchIcon sx={{ fontSize: sm ? 40 : 28 }} />
        </IconButton>
      </Toolbar>

      {/* Search Box */}
    </AppBar>

    /* <SideBarOpenButton onClick={openSidebarHandler}>
        
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
            <LayoutSearchWrapper>
              <LayoutHeaderLogo
                onClick={() => {
                  navigate("/");
                }}
              >
                B303
              </LayoutHeaderLogo>
              <SearchIcon
                sx={{ fontSize: 40 }}
                onClick={openSearchBar}
              ></SearchIcon>
            </LayoutSearchWrapper>
          )}
        </LayoutSearchParent>
      ) : (
        <LayoutHeaderLogo
          onClick={() => {
            navigate("/");
          }}
        >
          B303
        </LayoutHeaderLogo>
      )} */
  );
};

export default Header;

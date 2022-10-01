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
import RecipeSearchDialog from "./main_header_search";

const Header = ({ sidebarHandler }) => {
  const navigate = useNavigate();

  // Recipe search Button
  const [showSearchBtn, setshowSearchBtn] = useState(true);
  const [isShowSearchDialog, setIsShowSearchDialog] = useState(false);

  // window size check queries
  const sm = useMediaQuery("(min-width:768px)");
  const m = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const xl = useMediaQuery("only screen and (min-width: 1025px)");

  // check url for showing search button
  const location = useLocation();
  useEffect(() => {
    // list of shown recipe search
    const search_shown_path = ["/community/"];
    setshowSearchBtn(true);

    search_shown_path.forEach((path) => {
      if (location.pathname.includes(path)) {
        setshowSearchBtn(false);
      }
    });
  }, [location.pathname]);

  // search
  const handleSearch = (filter) => {
    setIsShowSearchDialog(false);
    navigate("/recipe", {
      state: filter,
    });
    if (location.pathname.includes("/recipe")) window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ background: Palette.mainColor4 }}>
      <Toolbar
        sx={{
          px: 1,
          py: 0,
          justifyContent: "space-between",
          position: "relative",
        }}
      >
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
          leftShift={!showSearchBtn}
        />
        {/* search icon */}
        {showSearchBtn ? (
          <IconButton
            color="inherit"
            onClick={() => {
              setIsShowSearchDialog(true);
            }}
          >
            <SearchIcon sx={{ fontSize: sm ? 40 : 32 }} />
          </IconButton>
        ) : (
          <Box sx={{ width: 48 }}></Box>
        )}
      </Toolbar>

      {/* Search Box */}
      <RecipeSearchDialog
        dialogOpen={isShowSearchDialog}
        setDialogOpen={setIsShowSearchDialog}
        handleSearch={handleSearch}
      />
    </AppBar>
  );
};

export default Header;

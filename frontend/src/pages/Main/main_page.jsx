import React, { useState } from "react";
import TagList from "./components/tag-list";
import SearchBar from "./components/search-bar";
import { MainPageDiv } from "./main_page_styles";

const MainPage = () => {
  return (
    <MainPageDiv>
      <SearchBar />
      <TagList />
    </MainPageDiv>
  );
};

export default MainPage;

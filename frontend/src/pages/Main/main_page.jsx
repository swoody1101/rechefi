import React, { useState } from "react";
import TagList from "./components/tag_list";
import SearchBar from "./components/search_bar";
import { MainContentWrapper, MainPageDiv } from "./main_page_styles";

const MainPage = () => {
  return (
    <MainPageDiv>
      <MainContentWrapper>
        <SearchBar />
        <TagList />
      </MainContentWrapper>
    </MainPageDiv>
  );
};

export default MainPage;

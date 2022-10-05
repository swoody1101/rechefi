import React from "react";
import TagList from "./components/tag_list";
import { MainContentWrapper, MainPageDiv } from "./main_page_styles";

const MainPage = () => {
  return (
    <MainPageDiv>
      <MainContentWrapper>
        <TagList />
      </MainContentWrapper>
    </MainPageDiv>
  );
};

export default MainPage;

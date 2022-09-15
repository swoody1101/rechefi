import { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchButton,
  SearchInput,
  SearchSelect,
  SearchWrapperDiv,
} from "../styles/search_bar_styles";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // const [searchWord, setSearchWord] = useState("");
  const [selectMenu, setSelectMenu] = useState("제목");
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const onClick = (e) => {
    e.preventDefault();
    const searchWord = searchBarRef.current.value;

    // setSearchWord(searchBarRef.current.value);
    searchBarRef.current.value = null;
    navigate("/recipe", {
      state: {
        searchTag: selectMenu,
        keyword: searchWord,
      },
    });
  };
  const onChange = (e) => {
    setSelectMenu(e.target.value);
  };

  return (
    <div>
      <SearchWrapperDiv>
        <SearchSelect onChange={onChange} defaultValue={"제목"} id="selectTest">
          <option key={"제목"}>제목</option>
          <option key={"태그"}>태그</option>
          <option key={"재료"}>재료</option>
          <option key={"글 내용"}>글 내용</option>
        </SearchSelect>
        <SearchInput ref={searchBarRef} />
        <SearchButton onClick={onClick}>
          <SearchIcon />
        </SearchButton>
      </SearchWrapperDiv>
      {/* <div> 검색어 {searchWord}</div> */}
      {/* <div>선택된 값 {selectMenu}</div> */}
    </div>
  );
};

export default SearchBar;

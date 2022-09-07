import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const searchTag = location.state.searchTag;
  return (
    <div>
      <div>검색한 keyword = {keyword}</div>
      <div>검색한 태그 = {searchTag} </div>
    </div>
  );
};

export default Test;

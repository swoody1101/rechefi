import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TagElementButton, TagListDiv } from "../styles/tag-list-styles";
import { useState } from "react";

const TagList = () => {
  const [selectTag, setSelectTag] = useState("");
  const tags = [
    { cookName: "치킨" },
    { cookName: "햄버거" },
    { cookName: "한식" },
    { cookName: "일식" },
    { cookName: "족발/보쌈" },
    { cookName: "중국집" },
    { cookName: "분식" },
    { cookName: "아시안" },
    { cookName: "양식" },
    { cookName: "디저트" },
    { cookName: "샐러드" },
    { cookName: "도시락" },
    { cookName: "야식" },
    { cookName: "찜/탕" },
    { cookName: "고기/구이" },
    { cookName: "샌드위치" },
    { cookName: "기타" },
  ];
  return (
    <TagListDiv>
      {Object.keys(tags).map((el, i) => (
        <TagElementButton
          key={i}
          onClick={() => {
            setSelectTag(tags[el].cookName);
          }}
        >
          <div>
            <AccountCircleIcon />
          </div>
          <div>{tags[el].cookName}</div>
        </TagElementButton>
      ))}
      <div>{selectTag}</div>
    </TagListDiv>
  );
};

export default TagList;

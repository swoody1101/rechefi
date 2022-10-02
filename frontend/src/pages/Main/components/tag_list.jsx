import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  TagElementButton,
  TagFoodImg,
  TagListDiv,
} from "../styles/tag_list_styles";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

const TagList = () => {
  const navigate = useNavigate();

  const tags = [
    { id: 1, name: "한식" },
    { id: 2, name: "양식" },
    { id: 3, name: "일식" },
    { id: 4, name: "중식" },
    { id: 5, name: "퓨전" },
    { id: 6, name: "집밥" },
    { id: 7, name: "디저트" },
    { id: 8, name: "빵/과자" },
    { id: 9, name: "음료" },
    { id: 10, name: "밑반찬" },
    { id: 11, name: "메인디쉬" },
    { id: 12, name: "기타" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mt: 2,
        justifyContent: "center",
      }}
    >
      {tags.map((el, i) => (
        <Paper
          key={i}
          sx={{
            width: "28%",
            height: "12%",
            p: 2,
            m: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            navigate("/recipe", {
              state: {
                keyword: "",
                tags: [el.id],
              },
            });
          }}
        >
          <TagFoodImg src={`/img/icon/${el.id}.png`} alt="아이콘" />
          <Typography fontSize={"1.05rem"} fontWeight={"bold"} sx={{ mt: 0.5 }}>
            {el.name}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TagList;

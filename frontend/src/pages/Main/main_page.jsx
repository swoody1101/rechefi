import React from "react";
import TagList from "./components/tag_list";
import { MainContentWrapper, MainPageDiv } from "./main_page_styles";

const MainPage = () => {
  // const tagInfo = [
  //   [
  //     { id: 0, name: "한식", img: "0.png" },
  //     { id: 1, name: "양식", img: "1.png" },
  //     { id: 2, name: "일식", img: "2.png" },
  //   ],

  //   [
  //     { id: 3, name: "중식", img: "0.png" },
  //     { id: 4, name: "퓨전", img: "0.png" },
  //     { id: 5, name: "집밥", img: "0.png" },
  //   ],

  //   [
  //     { id: 6, name: "기타", img: "0.png" },
  //     { id: 7, name: "디저트", img: "0.png" },
  //     { id: 8, name: "빵/과자", img: "0.png" },
  //   ],

  //   [
  //     { id: 9, name: "음료", img: "0.png" },
  //     { id: 10, name: "밑반찬", img: "0.png" },
  //     { id: 11, name: "메인디쉬", img: "0.png" },
  //   ],
  // ];

  return (
    <MainPageDiv>
      <MainContentWrapper>
        <TagList />
      </MainContentWrapper>
    </MainPageDiv>

    // <Container sx={{ display: "flex", flexDirection: "column", py: 2 }}>
    //   {tagInfo.map((row, idx) => (
    //     <Box display={"flex"}>
    //       {row.map((item) => (
    //         <Box
    //           sx={{
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //           }}
    //         >
    //           <img
    //             width="5vh"
    //             height="auto"
    //             alt={item.name}
    //             src={require(`../../assets/img/main_tag_icon/${item.img}`)}
    //           />
    //         </Box>
    //       ))}
    //     </Box>
    //   ))}
    // </Container>
  );
};

export default MainPage;

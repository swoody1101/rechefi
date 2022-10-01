import { useNavigate } from "react-router-dom";
import { Box, List } from "@mui/material";
import SidebarMyAccount from "./sidebar_content_account";
import SidebarContentItem from "./sidebar_content_item";
import SidebarContentSubheader from "./sidebar_content_subheader";
import useWidthQuery from "../../../../hooks/Main/useWidthQuery";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const SidebarContent = ({ isLogin, userEmail, sidebarClose }) => {
  const navigate = useNavigate();

  // for dynamic sizes
  const [sm, m, xl] = useWidthQuery();
  const icon_size_lg = xl ? "3rem" : m ? "2.5rem" : "2.1rem";
  const text_size_lg = xl ? "1.5rem" : "1.3rem";

  const sub_header_text_size = xl ? "1.2rem" : "0.9rem";
  const icon_size_m = xl ? "2.8rem" : m ? "2.2rem" : "1.9rem";
  const text_size_m = xl ? "1.3rem" : "1.1rem";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {/* user Avatar */}
      <SidebarMyAccount sidebarClose={sidebarClose} />

      <List sx={{ flexGrow: 1, my: 0.5 }}>
        {/* Home and Recipe item */}
        <Box sx={{ mb: 1.5 }}>
          <SidebarContentItem
            icon={<HomeIcon sx={{ fontSize: icon_size_lg }} />}
            text={"메인으로"}
            textSize={text_size_lg}
            textBold={true}
            onClick={() => {
              navigate("/");
              sidebarClose();
            }}
          />
          <SidebarContentItem
            icon={<MenuBookIcon sx={{ fontSize: icon_size_lg }} />}
            text={"레시피"}
            textSize={text_size_lg}
            onClick={() => {
              navigate("/recipe");
              sidebarClose();
            }}
          />
        </Box>

        {/* community items */}
        <Box sx={{ mb: 1 }}>
          <SidebarContentSubheader
            text={"커뮤니티"}
            fontSize={sub_header_text_size}
          ></SidebarContentSubheader>
          <SidebarContentItem
            icon={<BrunchDiningIcon sx={{ fontSize: icon_size_m }} />}
            text={"요리 자랑"}
            textSize={text_size_m}
            onClick={() => {
              navigate("/community/my-cook");
              sidebarClose();
            }}
          />
          <SidebarContentItem
            icon={<ArticleOutlinedIcon sx={{ fontSize: icon_size_m }} />}
            text={"자유 게시판"}
            textSize={text_size_m}
            onClick={() => {
              navigate("/community/free-board");
              sidebarClose();
            }}
          />
        </Box>

        {/* community items */}
        {isLogin ? (
          <Box sx={{ mb: 1 }}>
            <SidebarContentSubheader
              text={"설정"}
              fontSize={sub_header_text_size}
            ></SidebarContentSubheader>
            <SidebarContentItem
              icon={<PersonOutlinedIcon sx={{ fontSize: icon_size_m }} />}
              text={"내 정보"}
              textSize={text_size_m}
              onClick={() => {
                navigate("/profile", { state: userEmail });
                sidebarClose();
              }}
            />
            <SidebarContentItem
              icon={<GroupsOutlinedIcon sx={{ fontSize: icon_size_m }} />}
              text={"팔로우"}
              textSize={text_size_m}
              onClick={() => {
                navigate("/follower", { state: userEmail });
                sidebarClose();
              }}
            />
          </Box>
        ) : (
          ""
        )}
      </List>
    </Box>
  );
};

export default SidebarContent;

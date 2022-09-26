import { useState } from "react";
import {
  SidebarBoardDiv,
  SideBarCommunityDivWrapper,
  SideBarCommunityElementDiv,
  SidebarLogout,
  SidebarRecipeElement,
} from "../../styles/sidebar_styles";
import SidebarMyAccount from "./sidebar_my_account";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const SidebarElementList = ({ sidebarClose }) => {
  const [elements, setElements] = useState(["공지사항", "자랑", "잡담"]);
  const navigate = useNavigate();

  return (
    <SidebarBoardDiv>
      <SidebarMyAccount sidebarClose={sidebarClose} />
      <SidebarRecipeElement
        onClick={() => {
          navigate("/recipe", {
            state: {
              keyword: "",
              searchTag: "",
            },
          });
          sidebarClose();
        }}
      >
        레시피
      </SidebarRecipeElement>
      <div>
        <SideBarCommunityDivWrapper>커뮤니티</SideBarCommunityDivWrapper>

        <SideBarCommunityElementDiv
          onClick={() => {
            navigate("/community/my-cook");
            sidebarClose();
          }}
        >
          요리자랑
        </SideBarCommunityElementDiv>
      </div>
      <div
        onClick={() => {
          navigate("/");
          sidebarClose();
        }}
      >
        홈
      </div>
      <SidebarLogout>
        <LogoutIcon />
      </SidebarLogout>
    </SidebarBoardDiv>
  );
};

export default SidebarElementList;

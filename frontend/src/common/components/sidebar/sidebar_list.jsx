import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SidebarBoardDiv,
  SideBarCommunityDivWrapper,
  SideBarCommunityElementDiv,
  SidebarLogout,
  SidebarRecipeElement,
} from "../../styles/sidebar_styles";
import SidebarMyAccount from "./sidebar_my_account";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../store/module/accountReducer";

const SidebarElementList = ({ sidebarClose }) => {
  const loginInfo = useSelector((store) => store.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            navigate("/community/free-board");
            sidebarClose();
          }}
        >
          자유게시판
        </SideBarCommunityElementDiv>
        <SideBarCommunityElementDiv
          onClick={() => {
            navigate("/community/my-cook");
            sidebarClose();
          }}
        >
          요리자랑
        </SideBarCommunityElementDiv>
      </div>

      {loginInfo.auth ? (
        <>
          <SideBarCommunityDivWrapper>설정</SideBarCommunityDivWrapper>
          <SideBarCommunityElementDiv
            onClick={() => {
              navigate("/profile-modify");
              sidebarClose();
            }}
          >
            프로필 수정
          </SideBarCommunityElementDiv>
          <SideBarCommunityElementDiv onClick={() => {}}>
            회원 탈퇴
          </SideBarCommunityElementDiv>
        </>
      ) : (
        <></>
      )}

      <div
        onClick={() => {
          navigate("/");
          sidebarClose();
        }}
      >
        홈
      </div>
      {loginInfo.auth && (
        <SidebarLogout>
          <LogoutIcon
            onClick={() => {
              dispatch(logout());
            }}
          />
        </SidebarLogout>
      )}
    </SidebarBoardDiv>
  );
};

export default SidebarElementList;

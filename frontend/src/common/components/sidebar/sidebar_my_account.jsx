import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  SidebarMyAccountWrapper,
  SidebarMyNicknameDiv,
  SidebarMyProfileImage,
} from "../../styles/sidebar_styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SidebarMyAccount = ({ sidebarClose }) => {
  const loginInfo = useSelector((store) => store.account);
  const navigate = useNavigate();

  const mypageTransitionHandler = () => {
    navigate("/profile", { state: loginInfo.email });
  };

  return (
    <SidebarMyAccountWrapper>
      <SidebarMyProfileImage>
        <AccountCircleIcon sx={{ fontSize: 75 }} />
      </SidebarMyProfileImage>
      {loginInfo.auth ? (
        <SidebarMyNicknameDiv onClick={mypageTransitionHandler}>
          {loginInfo.nickname}
        </SidebarMyNicknameDiv>
      ) : (
        <div
          onClick={() => {
            navigate("/login");
            sidebarClose();
          }}
        >
          로그인하기
        </div>
      )}
    </SidebarMyAccountWrapper>
  );
};

export default SidebarMyAccount;

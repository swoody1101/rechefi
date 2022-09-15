import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  SidebarMyAccountWrapper,
  SidebarMyNicknameDiv,
  SidebarMyProfileImage,
} from "../../styles/sidebar_styles";

const SidebarMyAccount = () => {
  return (
    <SidebarMyAccountWrapper>
      <SidebarMyProfileImage>
        <AccountCircleIcon sx={{ fontSize: 75 }} />
      </SidebarMyProfileImage>
      <SidebarMyNicknameDiv>테스트 계정님</SidebarMyNicknameDiv>
    </SidebarMyAccountWrapper>
  );
};

export default SidebarMyAccount;

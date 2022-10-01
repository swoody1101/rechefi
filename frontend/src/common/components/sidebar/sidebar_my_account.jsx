import { Avatar, Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWidthQuery from "../../../hooks/Main/useWidthQuery";

const SidebarMyAccount = ({ sidebarClose }) => {
  const loginInfo = useSelector((store) => store.account);
  const navigate = useNavigate();

  // window size check queries
  const [sm, m, xl] = useWidthQuery();

  // avartar size
  const avatar_size = xl ? 92 : m ? 72 : sm ? 52 : 52;
  const nickname_size = xl ? "2rem" : m ? "1.8rem" : sm ? "1.4rem" : "1.4rem";

  // page move
  const moveMypage = () => {
    navigate("/profile", { state: loginInfo.email });
    sidebarClose();
  };

  // page move
  const moveLogin = () => {
    navigate("/login");
    sidebarClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", m: 2 }}>
        <Avatar
          src={loginInfo.imgUrl}
          sx={{ width: avatar_size, height: avatar_size, mr: 2 }}
          onClick={moveMypage}
        />
        {loginInfo.auth ? (
          <Typography
            variant="h5"
            fontSize={nickname_size}
            fontWeight={"bold"}
            onClick={moveMypage}
          >
            {loginInfo.nickname}
          </Typography>
        ) : (
          <Typography onClick={moveLogin}>로그인이 필요합니다</Typography>
        )}
      </Box>
      <Divider />
    </>
  );
};

export default SidebarMyAccount;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Palette } from "../../../../../common/styles/palette";
import { Box, Divider } from "@mui/material";
import BottombarButton from "../../../../Recipe/Write/components/bottombar/recipe_write_bottombar_btn";
import { usePost } from "../../../../../hooks/useMutations";

function FreeBoardDetailBottombar({ writerId }) {
  const navigate = useNavigate();
  const mutate = usePost();

  // get and handle Administrator info
  const login_info = useSelector((store) => store.account);
  const isAdmin = login_info.admin || false;
  const userId = login_info.userId || -2;

  // for delete and modify authority
  const isCanRevise = () => {
    if (isAdmin) return false;
    if (userId !== writerId) return true;
    else return false;
  };

  // delete post
  const deletePost = () => {
    mutate();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BottombarButton
          onClick={() => {
            navigate("/community/free-board");
          }}
          color={Palette.white1}
          style={{ color: Palette.black2 }}
        >
          목록
        </BottombarButton>

        {/* delete modify button */}
        <Box>
          <BottombarButton
            onClick={() => {}}
            color={Palette.white1}
            style={{ color: Palette.black2, mr: 1 }}
            disabled={isCanRevise()}
          >
            수정
          </BottombarButton>
          <BottombarButton
            onClick={deletePost}
            color={Palette.white1}
            style={{ color: Palette.black2 }}
            disabled={isCanRevise()}
          >
            삭제
          </BottombarButton>
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBoardDetailBottombar;

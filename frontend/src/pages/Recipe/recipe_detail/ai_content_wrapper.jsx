import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useContent } from "../../../hooks/Recipe/detail/useContent";
import AiContent from "./ai_content";
import { aiReadingInit } from "../../../store/module/AiReducer";
import { Box, Card, CircularProgress } from "@mui/material";

const AiContentWrapper = ({ synth, content, recognition }) => {
  const contentArray = useContent(content);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contentArray && contentArray.length > 0) {
      dispatch(aiReadingInit(contentArray));
    }
  }, [contentArray, dispatch]);
  return (
    <Box sx={{ width: "100%", height: "80%" }}>
      {contentArray.length > 0 ? (
        <AiContent recognition={recognition} synth={synth} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default AiContentWrapper;

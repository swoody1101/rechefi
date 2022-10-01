import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useContent } from "../../../hooks/Recipe/detail/useContent";
import AiContent from "./ai_content";
import { aiReadingInit } from "../../../store/module/AiReducer";

const AiContentWrapper = ({ synth, content, recognition }) => {
  const contentArray = useContent(content);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contentArray && contentArray.length > 0) {
      dispatch(aiReadingInit(contentArray));
    }
  }, [contentArray, dispatch]);
  return (
    <div>
      {contentArray.length > 0 ? (
        <AiContent recognition={recognition} synth={synth} />
      ) : (
        <div>불러오는 중...</div>
      )}
    </div>
  );
};

export default AiContentWrapper;

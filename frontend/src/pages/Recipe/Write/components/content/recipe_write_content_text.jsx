import React, { useState, useEffect } from "react";
import { Editor, EditorState } from "draft-js";
import { Box } from "@mui/material";

function RecipeWriteContentText({
  index,
  initValue,
  onChange,
}) {
  const [editorState, setEditorState] = useState(initValue);

  useEffect(() => {
    setEditorState(initValue);
  }, [initValue]);

  return (
    <Box sx={{ m: 1 }}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        onBlur={() => {
          onChange(index, editorState);
        }}
      />
    </Box>
  );
}

RecipeWriteContentText.defaultProps = {
  initValue: EditorState.createEmpty(),
};

export default RecipeWriteContentText;

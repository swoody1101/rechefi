import { Box } from "@mui/material";
import React from "react";
import { Editor, EditorState } from "draft-js";
import { convertFromHTML } from "draft-convert";

function ReadOnlyEditor({ HTML, style }) {
  return (
    <Box sx={{ m: 1, ...style }}>
      <Editor
        editorState={EditorState.createWithContent(
          convertFromHTML(HTML)
        )}
        readOnly
      />
    </Box>
  );
}

ReadOnlyEditor.defaultProps = {
  HTML: "<p></p>",
};

export default ReadOnlyEditor;

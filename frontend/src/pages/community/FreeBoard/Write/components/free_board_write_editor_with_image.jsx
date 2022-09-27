import { Editor, EditorState } from "draft-js";
import React, { useState } from "react";
import "../styles/free_board_write_editor.css";
import FreeBoardWriteEditorToolbar from "./free_board_write_editor_toolbar";

function EditorWithImage() {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <FreeBoardWriteEditorToolbar />
      <Editor
        placeholder="내용을 입력해주세요"
        editorState={editorState}
        onChange={onEditorStateChange}
        customStyleMap
      ></Editor>
    </>
  );
}

export default EditorWithImage;

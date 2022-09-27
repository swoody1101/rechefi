import { Editor, EditorState } from "draft-js";
import React from "react";
import "../../styles/free_board_write_editor.css";
import FreeBoardWriteEditorToolbar from "./free_board_write_editor_toolbar";

function EditorWithImage({ editorState, setEditorState }) {
  return (
    <>
      <FreeBoardWriteEditorToolbar />
      <Editor
        placeholder="내용을 입력해주세요"
        editorState={editorState}
        onChange={setEditorState}
      ></Editor>
    </>
  );
}

EditorWithImage.defaultProps = {
  editorState: EditorState.createEmpty(),
};

export default EditorWithImage;

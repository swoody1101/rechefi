import { Box, Button } from "@mui/material";
import { Editor } from "draft-js";
import React, { useRef } from "react";
import "../../styles/free_board_write_editor.css";
import FreeBoardWriteEditorToolbar from "./free_board_write_editor_toolbar";

function EditorWithImage({ editorState, setEditorState }) {
  // const toggleBlockType = (blockType) => {
  //   setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  // };

  // const onBoldClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  // };

  return (
    <>
      {/* <FreeBoardWriteEditorToolbar
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <Button onClick={onBoldClick}>B</Button> */}
      <Editor
        placeholder="내용을 입력해주세요"
        editorState={editorState}
        onChange={setEditorState}
      ></Editor>
    </>
  );
}

export default EditorWithImage;

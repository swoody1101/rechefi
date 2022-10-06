import { Editor } from "draft-js";
import React from "react";
import "../../styles/free_board_write_editor.css";

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

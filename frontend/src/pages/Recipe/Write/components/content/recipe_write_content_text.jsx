import React, { useState, useEffect } from "react";
import { Editor, EditorState } from "draft-js";

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
    <>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        onBlur={() => {
          onChange(index, editorState);
        }}
      />
    </>
  );
}

RecipeWriteContentText.defaultProps = {
  initValue: EditorState.createEmpty(),
};

export default RecipeWriteContentText;

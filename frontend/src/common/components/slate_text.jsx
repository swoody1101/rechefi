import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const SlateText = ({ content }) => {
  const editor = useMemo(
    () => withReact(createEditor()),
    []
  );
  return (
    <Slate editor={editor} value={[content]}>
      <Editable readOnly />
    </Slate>
  );
};

export default SlateText;

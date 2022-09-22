import { Box } from "@mui/material";
import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

function RecipeWriteContentText({ index, onUpdated }) {
  // currently not used
  const preventedKey = [
    { key: "&", converted: "&amp" },
    { key: "<", converted: "&lt" },
    { key: ">", converted: "&gt" },
  ];

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const [editor] = useState(() =>
    withReact(createEditor())
  );

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Box sx={{ mx: 2, my: 1 }}>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => onUpdated(index, value)}
      >
        <Editable renderElement={renderElement} />
      </Slate>
    </Box>
  );
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default RecipeWriteContentText;

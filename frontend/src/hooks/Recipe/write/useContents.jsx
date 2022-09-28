import { useState } from "react";
import { EditorState } from "draft-js";

export function useContents() {
  const [contents, setContents] = useState([]);

  const addTextBlock = () => {
    setContents([
      ...contents,
      {
        type: "text",
        content: EditorState.createEmpty(),
      },
    ]);
  };

  const addImageBlock = (link) => {
    setContents([
      ...contents,
      { type: "image", content: link },
    ]);
  };

  const deleteBlock = (index) => {
    setContents(
      contents.filter((ele, idx) => index !== idx)
    );
  };

  // text edited update
  const updateTextContent = (index, updated) => {
    setContents(
      contents.map((ele, idx) =>
        idx === index ? { ...ele, content: updated } : ele
      )
    );
  };

  // handle block position
  const downBlockPos = (index) => {
    if (index === 0) return;

    setContents([
      ...contents.slice(0, index - 1),
      contents[index],
      contents[index - 1],
      ...contents.slice(index + 1),
    ]);
  };
  const upBlockPos = (index) => {
    if (index === contents.length - 1) return;

    setContents([
      ...contents.slice(0, index),
      contents[index + 1],
      contents[index],
      ...contents.slice(index + 2),
    ]);
  };

  return [
    contents,
    setContents,
    addTextBlock,
    addImageBlock,
    deleteBlock,
    updateTextContent,
    downBlockPos,
    upBlockPos,
  ];
}

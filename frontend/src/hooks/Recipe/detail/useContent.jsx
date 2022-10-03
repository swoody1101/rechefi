import { useEffect } from "react";
import { useState } from "react";

export const useContent = (contents) => {
  const [contentArray, setContentArray] = useState([]);
  useEffect(() => {
    let text = [];
    contents.split("```").forEach((e) => {
      if (e.slice(0, 3) === "<p>") {
        const temp = e.slice(3, e.length - 4);
        text.push(temp);
      }
    });
    setContentArray(text);
  }, []);

  return contentArray;
};

import { useState } from "react";

export function useTitle() {
  // control title data
  const [title, setTitle] = useState(null);

  // for helper message
  const titleValidation = () => {
    // dismiss value at first
    if (title === null) return true;
    if (0 < title.length && title.length < 35) return true;
    else return false;
  };

  return [title, setTitle, titleValidation];
}

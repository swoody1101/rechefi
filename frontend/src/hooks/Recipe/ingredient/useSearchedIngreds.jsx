import { useState } from "react";

export function useSearchedIngreds() {
  const [searchedIngred, setSearchedIngred] = useState([]);

  // DEBUG
  const searchIngred = (keyword) => {
    // TODO : replace with REST API
    setSearchedIngred([
      {
        id: 1,
        name: "양파양파양파양파양파양파양파",
      },
      {
        id: 2,
        name: "마파",
      },
      {
        id: 3,
        name: "대파",
      },
      {
        id: 4,
        name: "파",
      },
    ]);
  };

  return [searchedIngred, searchIngred];
}

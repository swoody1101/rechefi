import { useState } from "react";

export function useSelectedIngreds() {
  // handle ingred info
  const [selectedIngreds, setSelectedIngred] = useState([]);

  const addIngred = (ingred) => {
    // check duplicated
    let isDuplicated = false;
    selectedIngreds.forEach((ele) => {
      if (ele.id === ingred.id) isDuplicated = true;
    });
    // failed to add
    if (isDuplicated) return false;

    // add success
    setSelectedIngred([
      ...selectedIngreds,
      { ...ingred, include: true },
    ]);
    return true;
  };

  const deleteIngred = (ingred_id) => {
    setSelectedIngred(
      selectedIngreds.filter(
        (ingred) => ingred.id !== ingred_id
      )
    );
  };

  // change include or exclude
  const changeIngred = (ingred_id, flag) => {
    setSelectedIngred(
      selectedIngreds.map((ingred) =>
        ingred.id === ingred_id
          ? { ...ingred, include: flag }
          : ingred
      )
    );
  };

  return [
    selectedIngreds,
    addIngred,
    deleteIngred,
    changeIngred,
  ];
}

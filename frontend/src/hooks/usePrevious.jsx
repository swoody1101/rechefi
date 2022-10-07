import React, { useEffect, useRef } from "react";

export function usePrevious(value) {
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    if (value !== null && value !== undefined) ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
}

import { useState } from "react";

export function useSelectedTag() {
  // control tag information
  const [selectedTags, setSelectedTags] = useState([]);

  const addTag = (tag_id) => {
    setSelectedTags([...selectedTags, tag_id]);
  };

  const deleteTag = (tag_id) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tag_id));
  };

  return [selectedTags, addTag, deleteTag];
}

import { Box } from "@mui/material";
import React from "react";
import TitleWithDivider from "../../../../../../common/components/title_with_divider";
import RecipeListFilterTagChip from "./recipe_list_filter_tag_item";
import { useTags } from "../../../../../../hooks/Recipe/tag/useTags";

function RecipeListFilterTags({
  onTagAdded,
  onTagDeleted,
}) {
  const [tags, setTags] = useTags();

  /**
   * add or delete tag to selected tags
   * @param {Integer} tag_id
   */
  const toggleTagSelected = (tag_id) => {
    // check selected
    tags.forEach((tag) => {
      if (tag.id === tag_id) {
        if (tag.selected) {
          onTagDeleted(tag_id);
        } else {
          onTagAdded(tag_id);
        }
      }
    });

    // set color toggle
    setTags(
      tags.map((tag) =>
        tag.id === tag_id
          ? { ...tag, selected: !tag.selected }
          : tag
      )
    );
  };

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TitleWithDivider variant="h6" title="요리 태그" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 1,
        }}
      >
        {tags.map((tag) => (
          <RecipeListFilterTagChip
            key={tag.id}
            tag={tag}
            onClick={(e) => toggleTagSelected(tag.id)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RecipeListFilterTags;

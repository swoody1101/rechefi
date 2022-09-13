import {
  Box,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

function RecipeListFilterTags({
  onTagAdded,
  onTagDeleted,
}) {
  // DEBUG
  const data = [
    {
      id: 1,
      name: "중식",
    },
    {
      id: 2,
      name: "한식",
    },
    {
      id: 3,
      name: "양식",
    },
    {
      id: 4,
      name: "일식",
    },
    {
      id: 5,
      name: "월식",
    },
    {
      id: 6,
      name: "잡식",
    },
    {
      id: 7,
      name: "육식",
    },
    {
      id: 8,
      name: "채식",
    },
    {
      id: 9,
      name: "오태식",
    },
  ];

  const [tags, setTags] = useState(
    data.map((tag) => ({ ...tag, selected: false }))
  );

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

    // set color UI toggle
    setTags(
      tags.map((tag) =>
        tag.id === tag_id
          ? { ...tag, selected: !tag.selected }
          : tag
      )
    );
  };

  const tagItems = tags.map((tag) => (
    <Chip
      key={tag.id}
      label={tag.name}
      color={tag.selected ? "success" : "primary"}
      sx={{
        mx: 1,
      }}
      onClick={(e) => toggleTagSelected(tag.id)}
    />
  ));

  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="h6" fontWeight={"bold"}>
        요리 분류
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          rowGap: 1,
        }}
      >
        {tagItems}
      </Box>
    </Box>
  );
}

export default RecipeListFilterTags;

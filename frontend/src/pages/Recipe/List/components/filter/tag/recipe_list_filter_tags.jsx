import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Warn } from "../../../../../../common/components/sweatAlert";
import TitleWithDivider from "../../../../../../common/components/title_with_divider";
import http from "../../../../../../utils/http-commons";
import RecipeListFilterTagChip from "./recipe_list_filter_tag_item";

function RecipeListFilterTags({
  onTagAdded,
  onTagDeleted,
}) {
  // TODO : remove dummy and change state init
  const [tags, setTags] = useState([]);

  // get tags from server
  useEffect(() => {
    http
      .get("/recipe/tag")
      .then((response) => {
        let tagList = response.data.data;
        setTags(
          tagList.map((tag) => ({
            ...tag,
            selected: false,
          }))
        );
      })
      .catch(
        Warn(
          "태그 목록을 불러오는 중 문제가 발생하였습니다"
        )
      );
  }, []);

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

  const tagItems = tags.map((tag) => (
    <RecipeListFilterTagChip
      key={tag.id}
      tag={tag}
      onClick={(e) => toggleTagSelected(tag.id)}
    />
  ));

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
        {tagItems}
      </Box>
    </Box>
  );
}

export default RecipeListFilterTags;

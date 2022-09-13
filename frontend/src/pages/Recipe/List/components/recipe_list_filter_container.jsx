import {
  Accordion,
  AccordionSummary,
  Button,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecipeListFilterTags from "./recipe_list_filter_tags";
import RecipeListFilterIngredients from "./recipe_list_filter_ingredients";

function RecipeListFilterContainer({ onFilterApplied }) {
  // handle tag information
  const [selectedTags, setSelectedTags] = useState([]);

  const addTag = (tag_id) => {
    setSelectedTags([...selectedTags, tag_id]);
  };

  const deleteTag = (tag_id) => {
    setSelectedTags(
      selectedTags.filter((tag) => tag !== tag_id)
    );
  };

  return (
    <Accordion
      sx={{
        border: 0,
        elevation: 0,
        boxShadow: "none",
      }}
    >
      {/* set expand event only icon */}
      <AccordionSummary
        sx={{
          pointerEvents: "none",
          // disable rotate animation
          ".MuiAccordionSummary-expandIconWrapper": {
            transform: "none !important",
          },
        }}
        expandIcon={
          <FilterListIcon
            sx={{
              pointerEvents: "auto",
            }}
          />
        }
      ></AccordionSummary>

      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
        }}
      >
        {selectedTags}
        <RecipeListFilterTags
          onTagAdded={addTag}
          onTagDeleted={deleteTag}
        />
        <RecipeListFilterIngredients />
        <Button
          variant="contained"
          onClick={onFilterApplied}
          sx={{ m: 1 }}
        >
          적용
        </Button>
      </Paper>
    </Accordion>
  );
}

export default RecipeListFilterContainer;

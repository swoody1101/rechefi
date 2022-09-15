import {
  Accordion,
  AccordionSummary,
  Button,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecipeListFilterTags from "./tag/recipe_list_filter_tags";
import RecipeListFilterIngredients from "./ingredient/recipe_list_filter_ingredient";

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

  // handle ingred info
  const [selectedIngreds, setSelectedIngred] = useState([]);

  const addIngred = (ingred) => {
    setSelectedIngred([
      ...selectedIngreds,
      { ...ingred, include: true },
    ]);
  };

  const deleteIngred = (ingred_id) => {
    setSelectedIngred(
      selectedIngreds.filter(
        (ingred) => ingred.id !== ingred_id
      )
    );
  };

  const changeIngred = (ingred_id, flag) => {
    setSelectedIngred(
      selectedIngreds.map((ingred) =>
        ingred.id === ingred_id
          ? { ...ingred, include: flag }
          : ingred
      )
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
        }}
      >
        <RecipeListFilterTags
          onTagAdded={addTag}
          onTagDeleted={deleteTag}
        />
        <RecipeListFilterIngredients
          onIngredAdded={addIngred}
          onIngredDeleted={deleteIngred}
          onIngredChanged={changeIngred}
          selectedIngred={selectedIngreds}
        />
        <Button
          variant="contained"
          onClick={() =>
            onFilterApplied({
              tags: selectedTags,
              ingreds: selectedIngreds,
            })
          }
          sx={{ m: 1 }}
        >
          적용
        </Button>
      </Paper>
    </Accordion>
  );
}

export default RecipeListFilterContainer;

import { Accordion, AccordionSummary, Paper } from "@mui/material";
import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecipeListFilterTags from "./tag/recipe_list_filter_tags";
import RecipeListFilterIngredients from "./ingredient/recipe_list_filter_ingredient";
import { useSelectedTag } from "../../../../../hooks/Recipe/tag/useSelectedTags";
import { useSelectedIngreds } from "../../../../../hooks/Recipe/ingredient/useSelectedIngreds";
import { useEffect } from "react";

function RecipeListFilterContainer({ onFilterApplied }) {
  // handle tag information
  const [selectedTags, addTag, deleteTag] = useSelectedTag();

  // handle ingred info
  const [selectedIngreds, addIngred, deleteIngred, changeIngred] =
    useSelectedIngreds();

  useEffect(() => {
    onFilterApplied({
      tags: selectedTags,
      ingreds: selectedIngreds,
    });
  }, [selectedIngreds, selectedTags, onFilterApplied]);

  return (
    <Accordion
      sx={{
        border: 0,
        elevation: 0,
        boxShadow: "none",
        m: 0,
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
        <RecipeListFilterTags onTagAdded={addTag} onTagDeleted={deleteTag} />
        <RecipeListFilterIngredients
          onSelectedIngredAdded={addIngred}
          onSelectedIngredDeleted={deleteIngred}
          onSelectedIngredChanged={changeIngred}
          selectedIngred={selectedIngreds}
        />
      </Paper>
    </Accordion>
  );
}

export default RecipeListFilterContainer;

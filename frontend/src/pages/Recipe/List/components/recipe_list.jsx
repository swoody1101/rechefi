import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  makeStyles,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecipeListItem from "./recipe_list_item";
import RecipeListFilterMenu from "./recipe_list_filter_menu";

function RecipeList({ recipes }) {
  // recipes data render
  const recipeItems = recipes.map((recipe) => (
    <RecipeListItem key={recipe.id} recipe={recipe} />
  ));

  return (
    <Container>
      <Accordion
        sx={{
          border: 0, elevation: 0, boxShadow: "none"
        }}
      >
        {/* set expand event only icon */}
        <AccordionSummary
          sx={{
            pointerEvents: "none",
            // disable rotate animation
            ".MuiAccordionSummary-expandIconWrapper": {
              transform: "none !important"
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
        <RecipeListFilterMenu/>
      </Accordion>
      <Box>{recipeItems}</Box>
    </Container>
  );
}

export default RecipeList;

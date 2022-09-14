import {
  Box,
  Divider,
  IconButton,
  StepContext,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RecipeListFilterSearch from "./recipe_list_filter_search";
import RecipeFilterIngredItem from "./recipe_list_filter_ingredient_item";
import AlertSnackbar from "../../../../common/components/alert_snackbar";

function RecipeListFilterIngredients({
  onIngredAdded,
  onIngredDeleted,
  onIngredChanged,
  selectedIngred,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchedIngred, setSearchedIngred] = useState([]);

  const openSearchDialog = () => {
    setSearchOpen(true);
  };

  // DEBUG
  const addDummy = (keyword) => {
    // TODO : replace with REST API
    setSearchedIngred([
      {
        id: 1,
        name: "양파양파양파양파양파양파양파",
      },
      {
        id: 2,
        name: "마파",
      },
      {
        id: 3,
        name: "대파",
      },
      {
        id: 4,
        name: "파",
      },
      {
        id: 5,
        name: "에너르기파",
      },
      {
        id: 11,
        name: "양파",
      },
      {
        id: 21,
        name: "마파",
      },
      {
        id: 31,
        name: "대파",
      },
      {
        id: 41,
        name: "파",
      },
      {
        id: 51,
        name: "에너르기파",
      },
      {
        id: 111,
        name: "양파",
      },
      {
        id: 211,
        name: "마파",
      },
      {
        id: 311,
        name: "대파",
      },
      {
        id: 411,
        name: "파",
      },
      {
        id: 511,
        name: "에너르기파",
      },
      {
        id: 1111,
        name: "양파",
      },
      {
        id: 2111,
        name: "마파",
      },
      {
        id: 3111,
        name: "대파",
      },
      {
        id: 4111,
        name: "파",
      },
      {
        id: 5111,
        name: "에너르기파",
      },
    ]);
  };

  // for control alert
  const ALERT_MESSAGE = "이미 추가된 재료입니다";
  const [alertOpen, setAlertOpen] = useState(false);

  const alertClose = () => {
    setAlertOpen(false);
  };

  // searched ingredients list item clicked
  const addIngred = (ingred) => {
    let isDup = false;

    // check duplicated
    selectedIngred.forEach((ele) => {
      if (ele.id === ingred.id) {
        setAlertOpen(true);
        isDup = true;
      }
    });

    if (!!!isDup) {
      onIngredAdded(ingred);
    }
  };

  // shown result
  const selectedIngredItems = selectedIngred.map((item) => (
    <RecipeFilterIngredItem
      key={item.id}
      ingredId={item.id}
      ingredName={item.name}
      onInclude={onIngredChanged}
      onDelete={onIngredDeleted}
    ></RecipeFilterIngredItem>
  ));

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{ flexGrow: 1 }}
        >
          재료 검색
        </Typography>
        <IconButton
          onClick={openSearchDialog}
          type="button"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {selectedIngredItems}
      </Box>

      {/* search dialog */}
      <RecipeListFilterSearch
        dialogOpen={searchOpen}
        setDialogOpen={setSearchOpen}
        handleSearch={addDummy}
        searchResult={searchedIngred}
        addSearchedItem={addIngred}
      ></RecipeListFilterSearch>

      <AlertSnackbar
        open={alertOpen}
        handleClose={alertClose}
        message={ALERT_MESSAGE}
      />
    </Box>
  );
}

export default RecipeListFilterIngredients;

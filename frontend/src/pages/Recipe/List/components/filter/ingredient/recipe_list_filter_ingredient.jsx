import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RecipeListFilterSearch from "./recipe_list_filter_ingredient_search";
import RecipeFilterIngredItem from "./recipe_list_filter_ingredient_item";
import AlertSnackbar from "../../../../../../common/components/alert_snackbar";
import TitleWithDivider from "../../../../../../common/components/title_with_divider";
import { useSearchedIngreds } from "../../../../../../hooks/Recipe/ingredient/useSearchedIngreds";

function RecipeListFilterIngredients({
  onSelectedIngredAdded,
  onSelectedIngredDeleted,
  onSelectedIngredChanged,
  selectedIngred,
}) {
  // for control search modal
  const [searchOpen, setSearchOpen] = useState(false);

  // for control alert
  const ALERT_MESSAGE = "이미 추가된 재료입니다";
  const [alertOpen, setAlertOpen] = useState(false);

  // searched ingredients list item clicked
  const selectSearchedIngred = (ingred) => {
    // show alert if adding is failed
    if (!onSelectedIngredAdded(ingred)) setAlertOpen(true);
  };

  const [searchedIngred, searchIngred] =
    useSearchedIngreds();

  // shown result
  const selectedIngredItems = selectedIngred.map((item) => (
    <RecipeFilterIngredItem
      key={item.id}
      ingredId={item.id}
      ingredName={item.name}
      onInclude={onSelectedIngredChanged}
      onDelete={onSelectedIngredDeleted}
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
      <TitleWithDivider
        variant="h6"
        title="재료 검색"
        onClick={() => setSearchOpen(true)}
        icon={<SearchIcon />}
      ></TitleWithDivider>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {selectedIngredItems}
      </Box>

      {/* search dialog */}
      <RecipeListFilterSearch
        dialogOpen={searchOpen}
        setDialogOpen={setSearchOpen}
        handleSearch={searchIngred}
        searchResult={searchedIngred}
        addSearchedItem={selectSearchedIngred}
      ></RecipeListFilterSearch>

      <AlertSnackbar
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
        message={ALERT_MESSAGE}
      />
    </Box>
  );
}

export default RecipeListFilterIngredients;

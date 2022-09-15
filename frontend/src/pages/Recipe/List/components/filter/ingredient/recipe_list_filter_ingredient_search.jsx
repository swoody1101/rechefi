import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RecipeFilterIngredSearchedItem from "./recipe_list_filter_ingredient_searched_item";

function RecipeListFilterSearch({
  dialogOpen,
  setDialogOpen,
  handleSearch,
  searchResult,
  addSearchedItem,
}) {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setTitle("");
    setKeyword("");
    setDialogOpen(false);
  };

  // enter event handling
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      search(keyword);
    }
  };

  // send to parent
  const search = () => {
    setTitle(`"${keyword}" 의 검색 결과`);
    handleSearch(keyword);
  };

  // shown result
  const searchItems = searchResult.map((item) => (
    <RecipeFilterIngredSearchedItem
      key={item.id}
      itemName={item.name}
      onClick={(e) => addSearchedItem(item)}
    ></RecipeFilterIngredSearchedItem>
  ));

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth
      sx={{
        // for dialog position
        "& .MuiDialog-container": {
          justifyContent: "center",
          alignItems: "flex-start",
          maxHeight: "80vh",
        },
      }}
      PaperProps={{ sx: { mt: 10 } }}
    >
      {title !== "" && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <OutlinedInput
            placeholder="검색 내용"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
            onKeyUp={onKeyUp}
          ></OutlinedInput>
          <IconButton
            onClick={search}
            type="button"
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mt: 2, mb: 1 }} />

        {/* shown searched result */}
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {searchItems}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeListFilterSearch;

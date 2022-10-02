import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import RecipeFilterBtn from "../../../pages/Recipe/List/components/filter/recipe_list_filter_btn";
import RecipeListFilter from "../../../pages/Recipe/List/components/filter/recipe_list_filter_container";

function RecipeSearchDialog({ dialogOpen, setDialogOpen, handleSearch }) {
  const [keyword, setKeyword] = useState("");

  const [filter, setFilter] = useState({
    tags: [],
    ingreds: [],
  });

  const handleClose = () => {
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
    handleSearch({ keyword: keyword, ...filter });
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
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
      <DialogTitle>레시피 검색</DialogTitle>
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
        </Box>
        {/* recipe filter */}
        <RecipeListFilter onFilterApplied={setFilter} />

        <RecipeFilterBtn Content={"검색"} onClick={search} />
      </DialogContent>
    </Dialog>
  );
}

export default RecipeSearchDialog;

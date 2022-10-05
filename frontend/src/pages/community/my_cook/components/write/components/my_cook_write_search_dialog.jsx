import { Box, Container, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import RecipeSearchDialog from "../../../../../../common/components/header/main_header_search";
import useFetchList from "../../../../../../hooks/useFetch";
import RecipeList from "../../../../../Recipe/List/components/recipe_list";
import RecipeListLoadingSpinner from "../../../../../Recipe/List/components/recipe_list_loading_spinner";

function MyCookWriteSearchDialog({
  isShowSearchDialog,
  setIsShowSearchDialog,
  onRecipeItemClicked,
}) {
  const QUERY_KEY = "SEARHCED_RECIPES";

  // get Recipe from server
  const [query, setQuery] = useState("");
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useFetchList(
    {
      queryKey: QUERY_KEY,
      articleId: 1,
      uri: "/recipe/",
      query: query,
    }
  );

  // search
  const handleSearch = (filter) => {
    setQuery(makeRecipeListQuery(filter));
  };
  useEffect(() => {
    // apply search result
    refetch();
  }, [query, refetch]);

  // for infinity scroll trigger
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  return (
    <RecipeSearchDialog
      dialogOpen={isShowSearchDialog}
      setDialogOpen={setIsShowSearchDialog}
      handleSearch={handleSearch}
    >
      <Divider sx={{ my: 3 }} />
      <Box>
        {isLoading ? (
          <RecipeListLoadingSpinner loading={isLoading} />
        ) : (
          data.pages.map((page, index) => (
            <RecipeList
              key={index}
              recipes={page.result.data.post}
              loading={isLoading}
              onRecipeItemClicked={onRecipeItemClicked}
            />
          ))
        )}
      </Box>
      {/* for infinity scroll trigger */}
      <Container ref={ref}></Container>
    </RecipeSearchDialog>
  );
}

// make request url query in recipe list
function makeRecipeListQuery(filter) {
  let query = "";
  if (!!!filter) return query;

  // handle title
  if (filter.keyword) query += `title=${filter.keyword}&`;

  // handle tags
  if (filter.tags && filter.tags.length !== 0) {
    query += "tag=";
    filter.tags.forEach((tag, idx) => {
      query += `${tag}${idx !== filter.tags.length - 1 ? "," : "&"}`;
    });
  }

  // handle ingredient
  if (filter.ingreds && filter.ingreds.length !== 0) {
    query += "ingredient=";
    filter.ingreds.forEach((ingred, idx) => {
      query += `${ingred.name}${idx !== filter.ingreds.length - 1 ? "," : ""}`;
    });
  }

  return query;
}

export default MyCookWriteSearchDialog;

import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import RecipeListItem from "./pages/Recipe/components/recipe_list_item";

// DEBUG

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <RecipeListItem></RecipeListItem>
    </div>
  );
}

export default App;

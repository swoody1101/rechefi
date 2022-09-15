import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";

// DEBUG
import RecipeListView from "./pages/Recipe/List/recipe_list_view";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <RecipeListView></RecipeListView>
    </div>
  );
}

export default App;

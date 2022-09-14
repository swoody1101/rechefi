import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/main_page";
import Layout from "./common/components/layout";
import Test from "./pages/test";
import RecipeDetail from "./pages/Recipe/recipe_detail/recipe_detail";
import MyCook from "./pages/community/my-cook";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/recipe" element={<Test />} />
            <Route path="/account" element={<MainPage />} />
            <Route path="/recipe/detail" element={<RecipeDetail />} />
            <Route path="/community/my-cook" element={<MyCook />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

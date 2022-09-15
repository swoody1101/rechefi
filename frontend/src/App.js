import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/main_page";
import Layout from "./common/components/Main_layout";
import RecipeDetail from "./pages/Recipe/recipe_detail/recipe_detail";
import MyCook from "./pages/community/my_cook/my_cook_container";
import RecipeListView from "./pages/Recipe/List/recipe_list_page";

import SignUp from "./pages/Account/Signup/signup_page";
import Login from "./pages/Account/Login/login_page";
import NewPassword from "./pages/Account/Login/new_password_page";
import MyPage from "./pages/Account/Mypage/mypage_page";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/recipe" element={<RecipeListView></RecipeListView>} />
            <Route path="/account" element={<MainPage />} />
            <Route path="/recipe/detail" element={<RecipeDetail />} />
            <Route path="/community/my-cook" element={<MyCook />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

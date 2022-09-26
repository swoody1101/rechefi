import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./pages/Main/main_page";
import Layout from "./common/components/Main_layout";
import RecipeDetail from "./pages/Recipe/recipe_detail/recipe_detail";
import MyCook from "./pages/community/my_cook/my_cook_container";

import RecipeList from "./pages/Recipe/List/recipe_list_page";
import RecipeWrite from "./pages/Recipe/Write/recipe_write_page";

import SignUp from "./pages/Account/Signup/signup_page";
import Login from "./pages/Account/Login/login_page";
import NewPassword from "./pages/Account/Login/new_password_page";
import MyPage from "./pages/Account/Mypage/mypage_page";
import MyCookWriter from "./pages/community/my_cook/components/write/write";
import { QueryClientProvider, QueryClient } from "react-query";
import ProfileModifyPage from "./pages/Account/Mypage/profile_modify_page";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Global styles={Reset} />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/recipe">
                <Route index element={<RecipeList />} />
                <Route path="write" element={<RecipeWrite />} />
              </Route>
              <Route path="/account" element={<MainPage />} />
              <Route path="/recipe/detail" element={<RecipeDetail />} />
              <Route path="/community">
                <Route path="write" element={<MyCookWriter />} />
                <Route path="my-cook" element={<MyCook />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/profile-modify" element={<ProfileModifyPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

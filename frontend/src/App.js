import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/main_page";
import Layout from "./common/components/Main_layout";
import MyCook from "./pages/community/my_cook/my_cook_container";
import MyCookWriter from "./pages/community/my_cook/components/write/write";

import RecipeList from "./pages/Recipe/List/recipe_list_page";
import RecipeDetail from "./pages/Recipe/recipe_detail/recipe_detail";
import RecipeWrite from "./pages/Recipe/Write/recipe_write_page";

import SignUp from "./pages/Account/Signup/signup_page";
import Login from "./pages/Account/Login/login_page";
import NewPassword from "./pages/Account/Login/new_password_page";
import ProfilePage from "./pages/Account/Mypage/profile_page";
import ProfileFollowerList from "./pages/Account/Mypage/follow/profile_follower_list";
import ProfileFollowingList from "./pages/Account/Mypage/follow/profile_following_list";
import ProfileModifyPage from "./pages/Account/Mypage/modify/profile_modify_page";

import NotFound from "./pages/NotFound/not_found_page";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useDispatch } from "react-redux";
import { getToken } from "./utils/JWT-token";
import { loadMyProfileThunk } from "./store/module/accountReducer";
import { useEffect } from "react";

import FreeBoardList from "./pages/community/FreeBoard/List/free_board_list_page";
import FreeBoardWrite from "./pages/community/FreeBoard/Write/free_board_write_page";
import FreeBoardDetail from "./pages/community/FreeBoard/Detail/free_board_detail_page";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getToken()) {
      dispatch(loadMyProfileThunk());
    }
  }, []);

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
              <Route path="/recipe/postId=:detail" element={<RecipeDetail />} />
              <Route path="/community">
                <Route path="free-board">
                  <Route index element={<FreeBoardList />} />
                  <Route path="write" element={<FreeBoardWrite />} />
                  <Route path="detail/:postId" element={<FreeBoardDetail />} />
                </Route>
                <Route path="write" element={<MyCookWriter />} />
                <Route path="my-cook" element={<MyCook />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile-modify" element={<ProfileModifyPage />} />
              <Route path="/follower" element={<ProfileFollowerList />} />
              <Route path="/following" element={<ProfileFollowingList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;

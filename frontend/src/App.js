import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./pages/Account/Signup/signup_view";
import Login from "./pages/Account/Login/login_view";
import NewPassword from "./pages/Account/Login/new_password_view";
import MyPage from "./pages/Account/Mypage/mypage_view";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

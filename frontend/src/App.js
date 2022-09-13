import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUpView from "./pages/Account/Singup/singup_view";
import LoginView from "./pages/Account/Login/login_view";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

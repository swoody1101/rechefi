import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./pages/Account/Singup/singup_view";
import LoginView from "./pages/Account/Login/login_view";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

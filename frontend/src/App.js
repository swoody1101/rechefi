import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/main_page";
import Layout from "./common/components/layout";
import Test from "./pages/test";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/recipe" element={<Test />} />
            <Route path="/account" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;

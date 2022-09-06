import { Global } from "@emotion/react";
import { Reset } from "./common/styles/global";

function App() {
  return (
    <div className="App">
      <Global styles={Reset} />
    </div>
  );
}

export default App;

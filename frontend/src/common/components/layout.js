import { LayoutStyledMain } from "../styles/layout_styles";
import Header from "./header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <LayoutStyledMain>{props.children}</LayoutStyledMain>
    </div>
  );
};

export default Layout;

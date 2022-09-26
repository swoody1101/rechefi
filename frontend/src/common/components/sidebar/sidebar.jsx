import { Backdrop, SideBarWrapper } from "../../styles/sidebar_styles";
import SidebarElementList from "./sidebar_list";


const SideBar = ({ sidebarClose }) => {
  return (
    <div>
      <SideBarWrapper>
        <SidebarElementList sidebarClose={sidebarClose} />
      </SideBarWrapper>
      <Backdrop onClick={sidebarClose} />
    </div>
  );
};

export default SideBar;

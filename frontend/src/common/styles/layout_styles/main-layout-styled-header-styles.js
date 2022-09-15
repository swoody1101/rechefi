import styled from "@emotion/styled";
import { Palette } from "../palette";

export const LayoutStyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Palette.mainColor5};
  width: 100%;
  height: 5vh;
  position: sticky;
  top: 0;
  z-index: 9;
`;

export const LayoutStyledMain = styled.main``;

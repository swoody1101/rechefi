import styled from "@emotion/styled";
import { Palette } from "../palette";

export const LayoutStyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Palette.mainColor5};
  width: 100%;
  height: 7vh;
  position: sticky;
  top: 0;
  z-index: 9;
  @media only screen and (min-width: 1025px) {
    height: 5vh;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 6vh;
  }
`;

export const LayoutStyledMain = styled.main`
  margin-top: 68px;
`;

export const LayoutSearchParent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LayoutSearchWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 3vw;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LayoutHeaderLogo = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LayoutSearchInputWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid;
  text-align: center;
  @media only screen and (min-width: 1025px) {
    width: 50%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 65%;
  }
`;

export const LayoutSearchInput = styled.input`
  width: 85%;
  height: 2vh;
  background: none;
  border: none;
`;

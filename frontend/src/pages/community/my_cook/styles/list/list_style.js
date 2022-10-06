import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Palette } from "../../../../../common/styles/palette";

const moveSideBar = keyframes`
  0%{
    transform: translate(-50%,100%);
  }
  100%{
    transform:translate(-50%,-50%);
  }
`;

export const MyCookGridUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  z-index: 1;
`;

export const MyCookGridUlWrapperDiv = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const MyCookGridWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MyCookGridLi = styled.li`
  height: 10vh;

  @media only screen and (min-width: 1025px) {
    height: 20vh;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 15vh;
  }

  flex-grow: 1;
  list-style-type: none;
`;

export const MyCookGridImage = styled.img`
  padding: 2px;
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

export const MyCookDetailWrapper = styled.div`
  animation: ${moveSideBar} 0.3s ease;
  z-index: 11;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  width: 85%;
  /* height: 85vh; */
  height: max-content;
  max-height: 85vh;
  background-color: ${Palette.white2};
  border-radius: 14px;
  overflow-y: scroll;
`;

export const MyCookDetailImageWrapper = styled.div`
  width: 100%;
`;

export const MyCookDetailImage = styled.img`
  border-radius: 14px;
  width: 100%;
  object-fit: cover;
`;

export const MyCookDetailContent = styled.div`
  margin-top: 10vh;
  margin-bottom: 5vh;
  margin-left: 1%;
  width: 98%;
  font-weight: bolder;
`;

export const MyCookDetailContentWithCommentWrapper = styled.div`
  bottom: 3px;
  width: 100%;
`;

export const MyCookDetailListLoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const MyCookDetailDeleteButtonWrapper = styled.button`
  background: none;
  background-color: ${Palette.mainColor3};
  width: 15%;
  border-radius: 8px;
  height: 6vh;
  margin-left: 3%;
  border: none;
  margin-bottom: 5%;
`;

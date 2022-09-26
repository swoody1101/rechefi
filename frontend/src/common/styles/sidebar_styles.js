import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const opacityKeyFrames = keyframes`
   0% {
    opacity: 0;
   }
   100%{
    opacity: 1;
   }
`;

const moveSideBar = keyframes`
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform:translateX(0%);
  }
`;

export const SideBarWrapper = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 75%;
  height: 100%;
  z-index: 15;
  animation: ${moveSideBar} 0.3s ease;
  @media only screen and (min-width: 1025px) {
    width: 25%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 35%;
  }
`;

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  animation: ${opacityKeyFrames} 0.4s ease;
`;

export const SideBarOpenButton = styled.button`
  border: none;
  background: none;
`;

export const SideBarCommunityDivWrapper = styled.div`
  margin-left: 5%;
  font-size: x-large;
  font-weight: bold;
  margin-top: 5%;
  padding: 3%;
`;

export const SideBarCommunityElementDiv = styled.div`
  margin-left: 3%;
`;

export const SidebarBoardDiv = styled.div``;

export const SidebarRecipeElement = styled.div`
  font-size: 7vw;
  font-weight: bolder;
  text-align: center;
  border-top: 2px solid;
  border-bottom: 2px solid;
  padding: 5%;
  margin-top: 5%;
  @media screen and (min-width: 1024px) {
    font-size: 3vw;
  }
`;

export const SidebarMyAccountWrapper = styled.div`
  height: 15vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const SidebarMyProfileImage = styled.div`
  position: relative;
  left: -10%;
`;

export const SidebarMyNicknameDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  left: -5%;
  font-size: large;
  font-weight: bold;
`;

export const SidebarLogout = styled.div`
  position: absolute;
  bottom: 2vh;
  right: 3vw;
`;

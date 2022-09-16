import styled from "@emotion/styled";
import { Palette } from "../../../../../common/styles/palette";

export const MyCookGridUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  z-index: 1;
`;

export const MyCookGridWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15%;
`;

export const MyCookGridLi = styled.li`
  height: 10vh;
  flex-grow: 1;
`;

export const MyCookGridImage = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

export const MyCookDetailWrapper = styled.div`
  z-index: 11;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  width: 85%;
  height: 85vh;
  background-color: ${Palette.mainColor3};
  border-radius: 14px;
`;

export const MyCookDetailImageWrapper = styled.div`
  width: 100%;
  max-height: 55vh;
  overflow-y: scroll;
`;

export const MyCookDetailImage = styled.img`
  display: block;
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
  margin-top: 1%;
  max-height: 34%;
  overflow: scroll;
`;

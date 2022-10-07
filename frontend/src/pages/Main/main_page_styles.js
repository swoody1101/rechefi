import styled from "@emotion/styled";

export const MainPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: 1025px) {
    width: 65%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 80%;
  }
`;

import { css } from "@emotion/react";
import { Palette } from "./palette";

export const Reset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .App {
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
  }

  .swal2-container {
    z-index: 300000;
  }
`;

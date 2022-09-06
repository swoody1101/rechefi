import { css } from "@emotion/react";

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

  :root {
    --main-color-5: #e38b29;
    --main-color-4: #f1a661;
    --main-color-3: #ffd8a9;
    --main-color-2: #fdeedc;
    --main-color-1: #fefbf7;
  }
`;

import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

import { CardImageStyle } from "../styles/recipe_list_item_style";

import { css } from "@emotion/react";

function RecipeListItem() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "2rem",
        maxHeight: "30%",
      }}
    >
      <CardActionArea>
        <img
          src={require("../../../assets/img/food_example_1.jpg")}
          alt="asdf"
          css={css`
            padding: 100px;
          `}
        />
        <CardContent>
          <Typography>asdf</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecipeListItem;

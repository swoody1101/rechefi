import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

function RecipeListItem(props) {
  const { data } = props;

  return (
    <Card
      sx={{
        margin: "2rem",
        height: "32%",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={require("../../../assets/img/food_example_1.jpg")}
          alt="food"
          sx={{ height: "64%", objectFit: "cover" }}
        />
        <CardContent>
          <Typography sx={{}}>
            자취생도 만들 수 있는 탕수육
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecipeListItem;

import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import RecipeListItemLikeBtn from "./recipe_list_item_like_btn";

function RecipeListItem({ recipe, onClick }) {
  return (
    <Card
      sx={{
        display: "flex",
        // height: "32%",
        mb: 1.5,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* thumbnail */}
        <CardMedia
          component="img"
          src={
            recipe.img_url
              ? recipe.img_url
              : // default image
                require("../../../../assets/img/food_example_2.jpg")
          }
          alt={recipe.title + "_img"}
          sx={{
            maxHeight: "120px",
            objectFit: "cover",
            alignSelf: "center",
          }}
        />
        <CardContent
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 1.5,
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textOverflow: "ellipsis",
              }}
            >
              {recipe.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <Avatar
                alt="P"
                src="/assets/img/food_example_2.jpg"
                sx={{ width: 24, height: 24, mr: 1 }}
              /> */}
              <Typography varaint="h6">{recipe.user.nickname}</Typography>
            </Box>
          </Box>

          {/* views and like */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              조회수 :{" " + (recipe.views ? recipe.views.toLocaleString() : 0)}
            </Typography>
            <RecipeListItemLikeBtn likes={recipe.likes} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecipeListItem;

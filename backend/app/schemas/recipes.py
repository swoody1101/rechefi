from typing import List, Union

from pydantic import BaseModel, Field
# from app.schemas.accounts import *
# from ..models.recipes import *
# from tortoise.contrib.pydantic import pydantic_model_creator
#
# Recipe_Pydantic = pydantic_model_creator(Recipe)


class TagForm(BaseModel):
    name: str = Field()


class IngredientForm(BaseModel):
    name: str = Field()


class IngredientRecipeForm(IngredientForm):
    amount: str


class RecipeLike(BaseModel):
    user_id: int


class RecipeCreateForm(BaseModel):
    user_id: int
    title: str
    content: str
    img_url: str = Field(nullable=True)
    tags: List[int]
    ingredients: List[IngredientRecipeForm]


class Recipe(RecipeCreateForm):
    created_at: str
    updated_at: str
    likes: List[RecipeLike]


class RecipeList(BaseModel):
    pass
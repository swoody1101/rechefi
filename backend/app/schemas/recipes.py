from typing import List, Union

from pydantic import BaseModel, Field
# from ..models.recipes import *
# from tortoise.contrib.pydantic import pydantic_model_creator
#
# Recipe_Pydantic = pydantic_model_creator(Recipe)


class TagForm(BaseModel):
    name: str = Field()


class IngredientForm(BaseModel):
    name: str = Field()


class IngredientRecipeForm(IngredientForm):
    amount: int


class Recipe(BaseModel):
    user_id: int
    title: str
    content: str
    img_url: str = Field(nullable=True)
    tags: List[int]
    ingredients: List[IngredientRecipeForm]


class RecipeCreateForm(Recipe):
    pass


class RecipeList(BaseModel):
    pass

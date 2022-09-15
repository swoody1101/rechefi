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


class RecipeCreateForm(BaseModel):
    title: str
    content: str
    img_url: str = Field(nullable=True)
    tags: List[int]
    ingredients: List[IngredientRecipeForm]


class RecipeList(BaseModel):
    pass


class RecipeCommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class RecipeCommentList(RecipeCommentForm):
    user_id: int
    nickname: str

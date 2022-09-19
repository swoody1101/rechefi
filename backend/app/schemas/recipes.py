from typing import List, Union

from pydantic import BaseModel, Field

from datetime import datetime
# from app.schemas.accounts import *
# from ..models.recipes import *
# from tortoise.contrib.pydantic import pydantic_model_creator
#
# Recipe_Pydantic = pydantic_model_creator(Recipe)


class RecipeCommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class RecipeCommentList(RecipeCommentForm):
    user_id: int
    nickname: str


class TagForm(BaseModel):
    name: str = Field()


class TagList(TagForm):
    id: int


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


class RecipeLikeUser(BaseModel):
    user_id: int


class RecipeList(BaseModel):
    user_id: int
    nickname: str
    title: str
    content: str
    img_url: str = Field(nullable=True)
    tags: List[TagList]
    # ingredients: List[IngredientRecipeForm]
    likes: int
    comment_count: int
    created_at: datetime
    updated_at: datetime



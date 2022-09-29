from typing import List

from pydantic import BaseModel, Field

from datetime import datetime

from app.schemas.accounts import CurrentUser


class RecipeCommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class RecipeCommentList(RecipeCommentForm):
    user_id: int
    user: CurrentUser
    created_at: datetime
    updated_at: datetime


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
    id: int
    title: str
    views: int
    img_url: str = Field(nullable=True)
    created_at: datetime
    updated_at: datetime


class RecipeRecommendation(RecipeList):
    likes: int
    user: CurrentUser
    comment_count: int
    tags: List[TagList]

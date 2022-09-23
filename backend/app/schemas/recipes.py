from typing import List

from pydantic import BaseModel, Field

from datetime import datetime


class RecipeCommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class RecipeCommentList(RecipeCommentForm):
    user_id: int
    nickname: str
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
    nickname: str
    title: str
    content: str
    img_url: str = Field(nullable=True)
    tags: List[TagList]
    likes: int
    comment_count: int
    created_at: datetime
    updated_at: datetime

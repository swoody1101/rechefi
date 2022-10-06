from typing import List, Union
from datetime import datetime

from app.schemas.accounts import CurrentUser
from app.schemas.common import CommonResponse, CommonArticleDetail

from pydantic import BaseModel, Field


class TagForm(BaseModel):
    name: str = Field()


class TagList(TagForm):
    id: int


class IngredientForm(BaseModel):
    name: str = Field()


class IngredientList(IngredientForm):
    id: int


class IngredientRecipeForm(IngredientForm):
    amount: str


class RecipeCreateForm(BaseModel):
    title: str
    content: str
    img_url: str = Field(nullable=True)
    tags: List[int]
    ingredients: List[IngredientRecipeForm]


class RecipeLikeUser(BaseModel):
    id: int


class RecipeLikeUserNickname(RecipeLikeUser):
    nickname: str


class SimpleRecipeList(BaseModel):
    user_id: int
    id: int
    title: str
    views: int
    img_url: str = Field(nullable=True)


class RecipeList(SimpleRecipeList):
    img_url: str = Field(nullable=True)
    created_at: datetime
    updated_at: datetime


class IncompleteRecipeList(RecipeList):
    likes: int
    user: CurrentUser
    comments_count: int
    tags: List[TagList]


class CompleteRecipeList(IncompleteRecipeList):
    ingredients: List[IngredientList]


class RecipeListPagination(BaseModel):
    post: List[Union[CompleteRecipeList, IncompleteRecipeList, RecipeList, SimpleRecipeList]]
    total_pages: int
    current_page: int


class RecipeListResponse(CommonResponse):
    data: RecipeListPagination


class RecipeDetail(BaseModel):
    recipe: CommonArticleDetail
    user: CurrentUser
    tags: List[TagList]
    ingredients: List[IngredientRecipeForm]
    like_users: List[RecipeLikeUserNickname]


class RecipeDetailResponse(CommonResponse):
    data: RecipeDetail


class BestRecipeResponse(CommonResponse):
    data: List[IncompleteRecipeList]

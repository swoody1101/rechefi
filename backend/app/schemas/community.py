from pydantic import BaseModel, Field
from typing import List, Union
from datetime import datetime

from app.schemas.accounts import CurrentUser
from app.schemas.common import CommonResponse


class ArticleCreateForm(BaseModel):
    title: str
    content: str
    img_url: str = Field(nullable=True)
    category: int = Field(nullable=True)


class ArticleCommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class ArticleCommentList(ArticleCommentForm):
    created_at: datetime
    updated_at: datetime
    user_id: int
    user: CurrentUser


class NoticeDetail(ArticleCreateForm):
    user_id: int
    created_at: datetime
    updated_at: datetime
    user: CurrentUser
    views: int


class ArticleDetail(ArticleCreateForm):
    user_id: int
    created_at: datetime
    updated_at: datetime
    user: CurrentUser
    views: int
    like_users: List[dict] = Field(Nullable=True)


class CookingDetail(ArticleDetail):
    recipe_id: int = Field(Nullable=True)


class CookingCreateForm(ArticleCreateForm):
    recipe_id: int = Field(nullable=False)


class SimpleArticleList(BaseModel):
    user_id: int
    id: int
    title: str
    views: int
    img_url: str = Field(nullable=True)


class ArticleList(SimpleArticleList):
    user_id: int
    id: int
    title: str
    views: int
    img_url: str = Field(nullable=True)
    created_at: datetime
    updated_at: datetime
    recipe_id: Union[int, None] = None
    category: int = Field(nullable=True)


class LikeUsers(BaseModel):
    id: int = Field(description="좋아요 유저 id")
    nickname: str = Field(description="좋아요 유저 닉네임")


class RecipeDetail(BaseModel):
    recipe: str
    user: str
    tags: str
    ingredients: str
    like_users: list[LikeUsers] = Field(description="좋아요 유저 리스트")

class RecipeDetailResponse(CommonResponse):
    data: RecipeDetail
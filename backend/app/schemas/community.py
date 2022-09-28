from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

from app.schemas.accounts import CurrentUser


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


class ArticleList(BaseModel):
    pass

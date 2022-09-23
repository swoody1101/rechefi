from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


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
    nickname: str


class NoticeDetail(ArticleCreateForm):
    user_id: int
    created_at: datetime
    updated_at: datetime
    nickname: str
    views: int


class ArticleDetail(ArticleCreateForm):
    user_id: int
    created_at: datetime
    updated_at: datetime
    nickname: str
    views: int
    like_users: List[dict] = Field(Nullable=True)


class CookingCreateForm(ArticleCreateForm):
    recipe_id: int = Field(nullable=False)


class ArticleList(BaseModel):
    pass

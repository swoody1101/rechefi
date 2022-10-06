from typing import List, Union
from datetime import datetime

from app.schemas.accounts import CurrentUser
from app.schemas.common import CommonResponse

from pydantic import BaseModel, Field

from app.schemas.recipes import ReferencedRecipe


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


class ArticleDetail(NoticeDetail):
    like_users: List[dict] = Field(Nullable=True)


class CookingDetail(ArticleDetail):
    recipe: Union[ReferencedRecipe, None] = None


class ArticleDetailResponse(CommonResponse):
    data: Union[CookingDetail, ArticleDetail, NoticeDetail]


class CookingCreateForm(ArticleCreateForm):
    recipe_id: int = Field(nullable=False)


class SimpleArticleList(BaseModel):
    user_id: int
    id: int
    title: str
    views: int
    img_url: str = Field(nullable=True)


class ArticleList(SimpleArticleList):
    created_at: datetime
    updated_at: datetime
    recipe_id: Union[int, None] = None
    category: int = Field(nullable=True)
    user: CurrentUser


class LikeUsers(BaseModel):
    id: int = Field(description="좋아요 유저 id")
    nickname: str = Field(description="좋아요 유저 닉네임")


class CompleteArticleList(ArticleList):
    likes: int
    comments_count: int


class ArticleListPagination(BaseModel):
    posts: List[Union[CompleteArticleList, ArticleList, SimpleArticleList]]
    total_pages: int
    current_page: int


class ArticleListResponse(CommonResponse):
    data: ArticleListPagination

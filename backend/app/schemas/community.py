from pydantic import BaseModel, Field
from typing import List, Union

# from app.enums.accounts import UserRegion


class ArticleCreateForm(BaseModel):
    title: str
    content: str
    img_url: str = Field(nullable=True)
    recipe_id: int = Field(nullable=True)


class ArticleList(BaseModel):
    pass


class ArticleCommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class ArticleCommentList(ArticleCommentForm):
    nickname: str

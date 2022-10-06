from typing import List
from datetime import datetime

from app.schemas.accounts import CurrentUser

from pydantic import BaseModel, Field, validator


class CommonResponse(BaseModel):
    message: str = "success"


class MessageResponse(CommonResponse):
    detail: str


class CommonFailedResponse(BaseModel):
    message: str = "failed"
    detail: str


class DuplicateResponse(BaseModel):
    duplicate: bool = True


class LoginResponse(CommonResponse):
    user_id: int = Field(nullable=True)


class SingleResponse(CommonResponse):
    id: int = Field(nullable=True)


class ObjectResponse(CommonResponse):
    data: dict = Field(nullable=True)


class MultipleObjectResponse(CommonResponse):
    data: list = Field(nullable=True)


class CommonLikeData(BaseModel):
    method: str = 'post'
    like: bool = True
    likes_count: int


class CommonLikeArticleResponse(CommonResponse):
    data: CommonLikeData


class CommentForm(BaseModel):
    content: str
    root: int
    group: int
    sequence: int


class CommentList(CommentForm):
    user_id: int
    group: int
    id: int
    user: CurrentUser
    created_at: datetime
    updated_at: datetime
    deleted: bool = False

    @validator('group',)
    def positive_group(cls, v):
        if v < 0:
            v = -(v+1)
        return v


class CommentListResponse(CommonResponse):
    data: List[CommentList]


class CommonArticleDetail(BaseModel):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    title: str
    content: str
    views: int
    img_url: str

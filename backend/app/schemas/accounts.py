from pydantic import BaseModel, Field
from typing import Union

"""
    User

    id: str
    password: str

    name: str
    age: int

"""


class UserSignupForm(BaseModel):
    email: str = Field(description="유저 이메일")
    password: str
    nickname: str


class UserLoginForm(BaseModel):
    email: str
    password: str

class MyPageForm(BaseModel):
    nickname: str
    about_me: Union[str, None]
    password: Union[str, None]
    img_url: Union[str, None]


####토큰####
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Union[str, None] = None


class CurrentUser(BaseModel):
    email: str
    nickname: str
    about_me: Union[str, None]
    img_url: Union[str, None]
    is_active: bool
    is_admin: bool

    # follower: 나를 팔로우한 사람 수, following: 내가 팔로우 하고있는 사람 수
    follower: Union[int, None]
    following: Union[int, None]



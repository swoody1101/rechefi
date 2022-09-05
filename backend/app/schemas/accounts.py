from pydantic import BaseModel, Field

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

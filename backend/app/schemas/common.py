from pydantic import BaseModel, Field


class CommonResponse(BaseModel):
    message: str = "success"


class LoginResponse(CommonResponse):
    user_id: int = Field(nullable=True)
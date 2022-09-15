from pydantic import BaseModel, Field


class CommonResponse(BaseModel):
    message: str = "success"


class CommonFailedResponse(BaseModel):
    message: str = "failed"
    detail: str


class LoginResponse(CommonResponse):
    user_id: int = Field(nullable=True)


class SingleResponse(CommonResponse):
    id: int = Field(nullable=True)


class ObjectResponse(CommonResponse):
    data: dict = Field(nullable=True)


class MultipleObjectResponse(CommonResponse):
    data: list = Field(nullable=True)

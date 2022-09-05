from fastapi import APIRouter

# from app.enums.accounts import COLOR, UserRegion
from app.models.accounts import User
from app.schemas.accounts import UserSignupForm, UserLoginForm
from app.schemas.common import CommonResponse, LoginResponse

router = APIRouter(prefix="/members", tags=["members"])


@router.post("/signup", description="회원가입", response_model=CommonResponse)
async def signup(req: UserSignupForm):
    await User.create(**req.dict())
    # if not req.email.isalpha()
    return CommonResponse()


@router.post("/login", response_model=LoginResponse)
async def login(req: UserLoginForm):
    # 로그인 로직
    return LoginResponse(user_id=1)


@router.get("/profile/{user_id}")
async def profile(user_id: int):
    # await User.get(id=user_id)
    return "ok"


# filter , sorting, pagination

# 유저목록 조회
# age ~>
# name ~>
@router.get("/search")
async def user_list(age: int, name: str):
    # user = await User.all()
    return f"{age}살 {name} 유저"

from fastapi import APIRouter

# from app.enums.accounts import COLOR, UserRegion
from app.models.accounts import User
from app.schemas.accounts import UserSignupForm, UserLoginForm
from app.schemas.common import CommonResponse, LoginResponse

# 로그인
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm 
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Union
from pydantic import BaseModel

router = APIRouter(prefix="/members", tags=["members"])

####### JWT 토큰 #######
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
####### JWT 토큰 #######

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="members/token")

####### 비밀번호 해싱 #######
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)


# def get_password_hash(password):
#     return pwd_context.hash(password)

# def authenticate_user(fake_db, username: str, password: str):
#     user = get_user(fake_db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user
####### 비밀번호 해싱 #######

async def authenticate_user(form_data):
    user = await User.get_or_none(email = form_data.username)
    if not user:
        return False
    # if not verify_password(password, user.hashed_password):
    #     return False
    return user


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    ### 인증 처리 ###
    user = await authenticate_user(form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 틀림",
            headers={"WWW-Authenticate": "Bearer"},
        )
    password = form_data.password
    if not password == user.password:
        raise HTTPException(status_code=400, detail="비밀번호 틀림")

    ### 토큰 발행 ###
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

    
    

@router.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

@router.get("/test")
async def test():
    test = await User.all()
    print(test)
    return test

####################################
####################################
####################################


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

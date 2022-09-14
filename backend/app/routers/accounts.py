from fastapi import APIRouter

# from app.enums.accounts import COLOR, UserRegion
from app.models.accounts import User
from app.schemas.accounts import UserSignupForm, CurrentUser
from app.schemas.common import CommonResponse

# 로그인
from fastapi import Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm 
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Union
from passlib.context import CryptContext
from app.schemas.accounts import TokenData

# 비밀번호 발급
import string, secrets


router = APIRouter(prefix="/members", tags=["members"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="members/login/1")

####### JWT 토큰 #######
SECRET_KEY = "788d89c0cc2378247a4157f6fb1745cab6b3243df21b8e3047a73401a6a25fe2"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60



def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



####### 비밀번호 해싱 #######
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(a, b):
    return pwd_context.verify(a, b)

async def authenticate_user(form_data):
    user = await User.get_or_none(email = form_data.username)
    if not user:
        print("이메일 틀림")
        return False
    if not verify_password(form_data.password, user.password):
        print("비밀번호 틀림")
        return False
    return user


####### 현재 유저정보 받아오기 #######
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="권한이 없습니다.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await User.get_or_none(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

####### 타 유저정보 받아오기 #######
async def get_other_user(member_id, current_user: User = Depends(get_current_user)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="존재하지 않는 유저입니다.",
        headers={"WWW-Authenticate": "Bearer"},
    )    
    other_user = await User.get_or_none(email=member_id)
    if other_user is None:
        raise credentials_exception
    return other_user

##################여기서부터 API입니다#################################

@router.post("/login/1", description="로그인")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    ### 아이디 비밀번호 확인 ###
    user = await authenticate_user(form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 혹은 비밀번호 틀림",
            headers={"WWW-Authenticate": "Bearer"},
        )

    ### 토큰 발행 ###
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

#나중에 구현
@router.post("/login/2", description="소셜로그인") 
async def social_login(): 
    pass


@router.post("/signup", description="회원가입", response_model=CommonResponse)
async def signup(req: UserSignupForm):
    req.password = get_password_hash(req.password)
    await User.create(**req.dict())
    # if not req.email.isalpha()
    return CommonResponse()

@router.get("/validation/1/{email}", description="아이디 중복체크")
async def email_check(email, response: Response):
    user = await User.get_or_none(email=email)
    if user is None:
        response.status_code = status.HTTP_201_CREATED
        return {"message": "success"}

@router.get("/validation/2/{nickname}", description="닉네임 중복체크")
async def nickname_check(nickname, response: Response):
    user = await User.get_or_none(nickname=nickname)
    if user is None:
        response.status_code = status.HTTP_201_CREATED
        return {"message": "success"}

# redis 연동 되면 구현
@router.get("/validation/3/{email}", description="이메일로 인증토큰 발송") 
def email_check():
    pass

@router.get("/logout", description="로그아웃") 
def logout():
    # redis 연동되면 블랙리스트 처리하고, 안되면 프론트에서 토큰삭제만
    pass

@router.get("/new-password/{email}", description="새로운 비밀번호 발급")
async def create_new_password():
    string_pool = string.ascii_letters + string.digits
    while True:
        temp_password = ''.join(secrets.choice(string_pool) for i in range(10))
        if (any(c.islower() for c in temp_password) 
        and any(c.isupper() for c in temp_password)
        and sum(c.isdigit() for c in temp_password) >= 3):
            break    
    return temp_password


@router.get("/", description="마이페이지", response_model=CurrentUser)
async def get_my_page(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/{member_id}", description="다른사람 페이지", response_model=CurrentUser)
async def get_other_page(member_id, other_user: User = Depends(get_other_user)):
    return other_user


@router.get("/follow/{member_id}", description="해당 유저의 팔로워/팔로우 조회")
async def get_follow(member_id, user: User = Depends(get_other_user)):
    followers = await user.followers
    followers = list(map(lambda followers: followers.email, followers))
    follows = await user.following
    follows = list(map(lambda follows: follows.email, follows))

    return {"followers": followers, "follows": follows}


@router.post("/follow/{member_id}", description="해당 유저를 팔로우/팔로우 취소")
async def do_follow(member_id, me: User = Depends(get_current_user), user: User = Depends(get_other_user)):
    # 본인이 아닌경우에만 팔로우/언팔로우 가능
    if me != user:
        if await me.following.filter(pk=user.pk).exists():
            await me.following.remove(user)
            return 'unfollow'
        await me.following.add(user)
        return 'follow'
    return '본인은 팔로우 할 수 없음'



####################################
####################################
####################################





# @router.post("/login", response_model=LoginResponse)
# async def login(req: UserLoginForm):
    # 로그인 로직
    # return LoginResponse(user_id=1)


# @router.get("/profile/{user_id}")
# async def profile(user_id: int):
    # await User.get(id=user_id)
    # return "ok"


# filter , sorting, pagination

# 유저목록 조회
# age ~>
# name ~>
# @router.get("/search")
# async def user_list(age: int, name: str):
    # user = await User.all()
    # return f"{age}살 {name} 유저"

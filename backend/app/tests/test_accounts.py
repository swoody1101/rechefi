import pytest

from app.models.accounts import User
from app.models.recipes import Tag
from app.schemas.accounts import UserSignupForm


@pytest.mark.asyncio
class TestSignup:
    async def test_signup_should_be_return_message_success(self):
        tag = await Tag.create(name="수민")
        assert await Tag.exists(name="수민")

    async def test_login_should_be_success(self):
        assert True


@pytest.mark.asyncio
async def test_login_should_be_success():
    assert True


@pytest.mark.asyncio
async def test_login_should_be_failed(async_client):
    # Given: 유저가 없음
    # When: 수민 유저로 로그인을 했을 때
    res = await async_client.post("/project/accounts/login", json={"email": 'email', "password": 'password'})

    # Then: 실패를 응답하고
    res_data = res.json()
    assert res_data["message"] == "failed"

# async def

   # 이메일 : 무조건 영어 -> 포맷은 {영문+숫자+특문 @ ㅇㅇㅇㅇㅇㅇ . com} -> 정규표현식
   # password : 영문 숫자 8~12자
   # age : 25살이하
   # 이름: 한글

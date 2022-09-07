import pytest

from app.models.accounts import User
from app.schemas.accounts import UserSignupForm


@pytest.mark.asyncio
class TestSignup:
    async def test_signup_should_be_return_message_success(self, async_client):
        form = UserSignupForm(
            email="suenin.jang@",
            password="1234123",
            nickname="수민",
        )
        res = await async_client.post("/project/accounts/signup", json=form.dict())

        res_data = res.json()
        assert res_data["message"] == "success"


@pytest.mark.asyncio
async def test_login_should_be_success():
    # Given: 수민이라는 유저를 생성한다.
    user = await User.create(email='email', password='password')

    # When: 수민 유저로 로그인을 했을 때
    res = await async_client.post("/accounts/login", json={"email": 'email', "password": 'password'})

    # Then: 성공을 응답하고, 수민 유저의 id 을 응답해야한다.
    res_data = res.json()
    assert res_data["message"] == "success"
    assert res_data["user_id"] == user.pk


@pytest.mark.asyncio
async def test_login_should_be_failed():
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

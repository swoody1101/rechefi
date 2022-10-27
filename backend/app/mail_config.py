from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.config import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER='app/templates/'
)


# 가입 인증 메일
async def signup_mail(background_tasks: BackgroundTasks, email: str, token: str):
    try:
        message = MessageSchema(
            subject="[RECHEFI]회원가입 인증을 요청합니다.",
            recipients=[email],
            template_body={'email': email, 'token': token}
            )
        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message, template_name='email_template.html')
        return True
    except:
        return False


# 임시 비밀번호 발급 메일
async def password_mail(background_tasks: BackgroundTasks, email: str, password: str):
    try:
        message = MessageSchema(
            subject="[RECHEFI]임시 비밀번호를 발급하였습니다.",
            recipients=[email],
            # body=f'다음과 같이 회원님의 임시 비밀번호를 발급합니다.\n{password}\n 로그인 후 비밀번호를 꼭 변경해주세요.',
            template_body={'email': email, 'password': password}
            )
        fm = FastMail(conf)

        background_tasks.add_task(fm.send_message, message, template_name='email_password.html')

        return True
    except:
        return False
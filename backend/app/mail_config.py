from fastapi import FastAPI, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv
import os

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM="ssafy303@naver.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.naver.com",
    MAIL_FROM_NAME="Project_name",
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_in_background(background_tasks: BackgroundTasks, email: str, token: str):
    try:
        message = MessageSchema(
            subject="회원가입 인증 메일입니다.",
            recipients=[email],
            body=f'아래 링크를 클릭하여 인증을 완료해주세요.\nhttp://localhost:8000/members/{email}/{token}\n인증 링크의 유효시간은 5분입니다.',
            )
        print(message.recipients)
        fm = FastMail(conf)

        background_tasks.add_task(fm.send_message,message)

        return True
        
    except:
        return False
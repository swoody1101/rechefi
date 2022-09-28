from pydantic import BaseSettings
import redis

class Settings(BaseSettings):
    # Main DB(Mysql)
    DB_URL : str = ""
    ROOT_PASSWORD: str = ""

    # Sub DB(Redis)
    REDIS_HOST: str = ""
    REDIS_PORT: int

    # mail_config
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = ""
    MAIL_PORT: int
    MAIL_SERVER: str = ""
    MAIL_FROM_NAME: str = ""

    # JWT
    SECRET_KEY: str = ""
    ALGORITHM: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # S3
    S3_BUCKET_NAME: str = ""
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    REGION_NAME: str = ""

    # AI SERVER
    AI_SERVER_URL: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

TORTOISE_ORM = {
    'connections': {
        'default': settings.DB_URL,
    },
    'apps': {
        'b303': {
            'models': [
                'aerich.models',
                'app.models.accounts',
                'app.models.community',
                'app.models.recipes',
            ],
            'default_connection': 'default',
        }
    },
    'use_tz': False,
    'timezone': 'Asia/Seoul'
}

pool = redis.ConnectionPool(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    # password=configs.REDIS_PASSWORD,
    decode_responses=True
)
redis_session = redis.Redis(connection_pool=pool)
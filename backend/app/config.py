from pydantic import BaseSettings
import redis

class Settings(BaseSettings):
    DB_URL : str = ""
    ROOT_PASSWORD: str = ""

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
    host='host.docker.internal',
    port=6379,
    # password=configs.REDIS_PASSWORD,
    decode_responses=True
)
redis_session = redis.Redis(connection_pool=pool)
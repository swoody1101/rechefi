from pydantic import BaseSettings

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
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from app.config import TORTOISE_ORM, settings
from app.routers import router

app = FastAPI(title="new project", version="0.6")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

register_tortoise(app=app, config=TORTOISE_ORM)

app.include_router(router)

@app.get("/")
async def index():
    print(settings.DB_URL)
    return {"message": "Hello World"}


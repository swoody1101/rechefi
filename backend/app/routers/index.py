from fastapi import APIRouter, Response, status, Header, Depends
from tortoise.expressions import Subquery, F

from app.models.recipes import Recipe, LikeRecipe

from app.schemas.recipes import RecipeList
from app.schemas.common import *

from datetime import datetime
from pytz import timezone
from pypika.functions import Count

router = APIRouter(prefix="", tags=["main"])


@router.get("/main/monthly-recipe", description="월간 레시피 목록 조회")
async def get_monthly_recipe():
    now = datetime.now()
    recipes = await Recipe.filter(
        created_at__gte=datetime(now.year, now.month, 1, tzinfo=timezone('Asia/Seoul'))
    ).select_related('user')
    data = [RecipeList(
        nickname=recipe.user.nickname,
        likes=await recipe.like_users.all().count(),
        tags=await recipe.tags,
        comment_count=len(await recipe.comments),
        **dict(recipe))
        for recipe in recipes]
    data.sort(key=lambda x: x.likes, reverse=True)
    data = data[:10]
    return MultipleObjectResponse(data=data)


@router.get("/main/best-recipe", description="최고의 레시피 목록 조회")
async def get_best_recipe():
    recipes = await Recipe.all().select_related('user')
    data = [RecipeList(
        nickname=recipe.user.nickname,
        likes=await recipe.like_users.all().count(),
        tags=await recipe.tags,
        comment_count=len(await recipe.comments),
        **dict(recipe))
        for recipe in recipes]
    data.sort(key=lambda x: x.likes, reverse=True)
    data = data[:10]
    return MultipleObjectResponse(data=data)

from fastapi import APIRouter

from app.models.recipes import Recipe
from app.schemas.accounts import CurrentUser

from app.schemas.recipes import IncompleteRecipeList, BestRecipeResponse
from app.schemas.common import *

from datetime import datetime
from pytz import timezone

router = APIRouter(prefix="", tags=["main"])


@router.get("/main/monthly-recipe", description="월간 레시피 목록 조회", response_model=BestRecipeResponse)
async def get_monthly_recipe():
    now = datetime.now()
    recipes = await Recipe.filter(
        created_at__gte=datetime(now.year, now.month, 1, tzinfo=timezone('Asia/Seoul'))
    ).select_related('user')
    data = [IncompleteRecipeList(
        user=CurrentUser(**dict(recipe.user)),
        likes=await recipe.like_users.all().count(),
        tags=await recipe.tags,
        comments_count=len(await recipe.comments),
        **dict(recipe))
        for recipe in recipes]
    data.sort(key=lambda x: x.likes, reverse=True)
    data = data[:10]
    return BestRecipeResponse(data=data)


@router.get("/main/best-recipe", description="최고의 레시피 목록 조회", response_model=BestRecipeResponse)
async def get_best_recipe():
    recipes = await Recipe.all().select_related('user')
    data = [IncompleteRecipeList(
        user=CurrentUser(**dict(recipe.user)),
        likes=await recipe.like_users.all().count(),
        tags=await recipe.tags,
        comments_count=len(await recipe.comments),
        **dict(recipe))
        for recipe in recipes]
    data.sort(key=lambda x: x.likes, reverse=True)
    data = data[:10]
    return BestRecipeResponse(data=data)

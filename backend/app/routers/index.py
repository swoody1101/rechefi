from fastapi import APIRouter, Response, status, Header, Depends
from app.models.recipes import Recipe

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
    ).prefetch_related('comments').select_related('like_users', 'user').annotate(likes=Count('like_users')).order_by('-likes').limit(10)
    data = [RecipeList(
        nickname=recipe.user.nickname,
        likes=recipe.likes,
        tags=await recipe.tags,
        comment_count=len(recipe.comments),
        **dict(recipe))
        for recipe in recipes]
    return MultipleObjectResponse(data=data)


@router.get("/main/best-recipe", description="최고의 레시피 목록 조회")
async def get_best_recipe():
    recipes = await Recipe.all().prefetch_related('comments').select_related('like_users', 'user').annotate(likes=Count('like_users')).order_by('-likes').limit(10)
    data = [RecipeList(
        nickname=recipe.user.nickname,
        likes=recipe.likes,
        tags=await recipe.tags,
        comment_count=len(recipe.comments),
        **dict(recipe))
        for recipe in recipes]
    return MultipleObjectResponse(data=data)

from fastapi import APIRouter, Response, status, Header, Depends
from typing import Union

from starlette.responses import JSONResponse

from app.routers.accounts import get_current_user

from app.models.recipes import Recipe, Tag, Ingredient, RecipeComment, LikeRecipe, RecipeIngredient
from app.models.accounts import User

from app.schemas.recipes import RecipeCreateForm, TagForm, IngredientForm, IngredientRecipeForm, RecipeCommentForm, \
    RecipeCommentList
from app.schemas.common import *

from datetime import datetime
from pytz import timezone

router = APIRouter(prefix="", tags=["main"])


@router.get("/main/monthly-recipe", description="월간 레시피 목록 조회")
async def get_monthly_recipe(recipe_id: int, q: Union[str, None] = None):
    now = datetime.now()
    recipes = await Recipe.filter(
        created_at__gte=datetime(now.year, now.month, 1, tzinfo=timezone('Asia/Seoul'))
    ).prefetch_related('like_users').select_related('user')
    recipes.sort(key=lambda x: len(x.like_users), reverse=True)
    return recipes


@router.get("/main/best-recipe", description="최고의 레시피 목록 조회")
async def get_best_recipe(recipe_id: int, q: Union[str, None] = None):
    recipes = await Recipe.all().prefetch_related('like_users').select_related('user')
    return [{"nickname": recipe.user.nickname, "recipe": recipe, "like_users": await recipe.like_users, "comments": await recipe.comments } for recipe in recipes]

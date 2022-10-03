from fastapi import APIRouter, Response, Depends, UploadFile, Request, File
from typing import Union
import asyncio
from starlette.responses import JSONResponse
from tortoise.expressions import F

from app.routers.accounts import get_current_user

from app.models.recipes import Recipe, Tag, Ingredient, RecipeComment, LikeRecipe, RecipeIngredient
from app.models.accounts import User
from app.schemas.accounts import CurrentUser

from app.schemas.recipes import *
from app.schemas.common import *
from app.config import settings
from httpx import AsyncClient

import random


router = APIRouter(prefix="/recipe", tags=["recipe"])


@router.post("/tag", description="레시피 태그 생성", response_model=CommonResponse)
async def create_tag(req: TagForm, user: User = Depends(get_current_user)):
    # if user.is_admin is True:
    if user is not None:
        await Tag.get_or_create(**req.dict())
    else:
        return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.get("/tag", description="레시피 태그 리스트 조회", response_model=MultipleObjectResponse)
async def get_tag_list():
    return MultipleObjectResponse(data=await Tag.all())


@router.get("/ingredient", description="레시피 재료 리스트 조회", response_model=MultipleObjectResponse)
async def get_ingredient_list(name: Union[str, None] = None):
    query = Ingredient.all()
    if name is not None:
        query = query.filter(name__contains=name)
    return MultipleObjectResponse(data=await query)


@router.post("/ingredient", description="레시피 재료 생성", response_model=CommonResponse)
async def create_ingredient(req: IngredientForm, user: User = Depends(get_current_user)):
    # if user.is_admin is True:
    if user is not None:
        await Ingredient.get_or_create(**req.dict())
    else:
        return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.post("/", description="레시피 작성", response_model=CommonResponse, status_code=201)
async def create_recipe(req: RecipeCreateForm, user: User = Depends(get_current_user)):
    recipe = await Recipe.create(user_id=user.id, title=req.title, content=req.content, img_url=req.img_url)
    for ingredient in req.ingredients:
        new_ingredient, created = await Ingredient.get_or_create(name=ingredient.name)
        await RecipeIngredient.create(recipe=recipe, ingredient=new_ingredient, amount=ingredient.amount)
    await recipe.tags.add(*[tag for tag in await Tag.filter(id__in=req.tags)])
    return CommonResponse()


@router.post("/speech-to-text", description="AI서버와 STT 데이터 통신")
async def get_ai_response(request: Request, file: UploadFile = File(...), user: User = Depends(get_current_user)):
    client = AsyncClient()
    num = str(random.random()).split('.')[1]
    try_count = 0
    if file.content_type.find("audio") == 0:
        try:
            try_count += 1
            stt_response = await client.post(f"{settings.AI_SERVER_URL}/stt",
                                             files={"file": (f'{user.id}_{user.nickname}_{num}_{file.filename}.wav', file.file)})
            await file.seek(0)
            return stt_response.json()
        except asyncio.exceptions.CancelledError:
            print('ttt')
            if try_count < 2:
                try_count += 1
                stt_response = await client.post(f"{settings.AI_SERVER_URL}/stt",
                                                 files={"file": (f'{user.id}_{user.nickname}_{num}_{file.filename}.wav',
                                                                 file.file)})
                await file.seek(0)
                return stt_response.json()
    return JSONResponse(content=CommonFailedResponse(detail=f'파일명: {file.filename}, 유형: {file.content_type}').dict())


@router.get("/detail/{recipe_id}", description="레시피 상세", response_model=RecipeDetailResponse)
async def recipe_detail(recipe_id: int):
    recipe = await Recipe.get_or_none(id=recipe_id).select_related('user')
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    else:
        recipe.views += 1
        await recipe.save()
        ingredients = [
            IngredientRecipeForm(name=recipe_ingredient.ingredient.name, amount=recipe_ingredient.amount)
            for recipe_ingredient in await RecipeIngredient.filter(recipe_id=recipe_id).select_related("ingredient")
        ]
    return RecipeDetailResponse(data=RecipeDetail(
            recipe=CommonArticleDetail(**dict(recipe)),
            user=CurrentUser(**dict(recipe.user)),
            tags=await recipe.tags.all(),
            ingredients=ingredients,
            like_users=await recipe.like_users.all().values("id", "nickname")
        ))


@router.get("/comment/{recipe_id}", description="레시피 댓글 리스트", response_model=CommentListResponse)
async def get_comment_list(recipe_id: int):
    comments = await RecipeComment.filter(recipe_id=recipe_id).select_related('user').order_by('-id')
    return CommentListResponse(
        data=[
            CommentList(
                **dict(comment),
                user=CurrentUser(**dict(comment.user)),
                deleted=True if comment.group < 0 else False
            ) for comment in comments
        ]
    )


@router.post("/comment/{recipe_id}", description="레시피 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_comment(recipe_id: int, req: CommentForm, user: User = Depends(get_current_user)):
    await RecipeComment.create(recipe_id=recipe_id, user_id=user.id, **req.dict())
    return CommonResponse()


@router.put("/comment/{comment_id}", description="레시피 댓글 수정", response_model=CommonResponse)
async def edit_comment(comment_id: int, req: CommentForm, user: User = Depends(get_current_user)):
    comment = await RecipeComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    else:
        if user.id == comment.user_id:
            comment.content = req.content
            await comment.save()
        else:
            return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.delete("/comment/{comment_id}", description="레시피 댓글 삭제", response_model=CommonResponse)
async def delete_comment(comment_id: int, user: User = Depends(get_current_user)):
    comment = await RecipeComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    if user.id != comment.user_id:
        return JSONResponse(status_code=403, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    if comment.group >= 0:
        comment.group = -(comment.group+1)
    if comment.group < 0 and user.is_admin:
        comment.group = -(comment.group+1)
    await comment.save(update_fields=("group",))
    return CommonResponse()


@router.post("/like/{recipe_id}", description="레시피 좋아요", response_model=CommonLikeArticleResponse)
async def like_recipe(recipe_id: int, response: Response, user: User = Depends(get_current_user)):
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 레시피가 없습니다.").dict())
    likes, created = await LikeRecipe.get_or_create(user_id=user.id, recipe_id=recipe_id)
    method = "post"
    if not created:
        await likes.delete()
        method = "delete"
    return CommonLikeArticleResponse(
        data=CommonLikeData(
            method=method, like=created, likes_count=await LikeRecipe.filter(recipe_id=recipe_id).count()
        )
    )


@router.put("/{recipe_id}", description="레시피 수정", response_model=SingleResponse)
async def edit_recipe(recipe_id: int, req: RecipeCreateForm, user: User = Depends(get_current_user)):
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    else:
        if recipe.user_id == user.id:
            await recipe.update(**req.dict())
        return SingleResponse(id=recipe_id)


@router.delete("/{recipe_id}", description="레시피 삭제", response_model=CommonResponse)
async def delete_recipe(recipe_id: int, user: User = Depends(get_current_user)):
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is not None and user.id == recipe.user_id:
        await Recipe.filter(id=recipe_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    return CommonResponse()


@router.get("/search-by-id/{page}", description="유저 id로 작성한 레시피 목록 조회", response_model=RecipeListResponse)
async def get_recipe_list_by_id(page: int, mid: int):
    filtered_recipes = list(await Recipe.filter(user_id=mid).prefetch_related('tags', 'ingredients').select_related('user').order_by('-id'))
    total_pages = 1 + len(filtered_recipes)//15
    current_page = page
    if 1 <= current_page <= total_pages:
        recipes = filtered_recipes[(current_page - 1) * 15:current_page * 15]
    else:
        current_page = 1
        recipes = filtered_recipes[:15]
    post = [

        SimpleRecipeList(**dict(recipe))
        for recipe in recipes
    ]
    return RecipeListResponse(data=RecipeListPagination(post=post, total_pages=total_pages, current_page=current_page))


@router.get("/{page}", description="레시피 목록 조회", response_model=RecipeListResponse)
async def get_recipe_list(page: int,
                          mid: Union[int, None] = None,
                          tag: Union[str, None] = None,
                          ingredient: Union[str, None] = None,
                          title: Union[str, None] = None):
    query = Recipe.all().prefetch_related('tags', 'ingredients').select_related('user').order_by('-id')
    if mid:
        query = query.filter(user_id=mid)
    if title:
        query = query.filter(title__contains=title)
    filtered_recipes = list(await query)
    if tag:
        tags = set(map(int, tag.split(',')))
        filtered_recipes = [recipe for recipe in filtered_recipes
                            if tags.issubset(await recipe.tags.all().values_list("id", flat=True))]
    if ingredient:
        ingredients = set(ingredient.split(','))
        filtered_recipes = [recipe for recipe in filtered_recipes
                            if ingredients.issubset(await recipe.ingredients.all().values_list("name", flat=True))]
    total_pages = 1 + len(filtered_recipes)//10
    current_page = page
    if 1 <= current_page <= total_pages:
        recipes = filtered_recipes[(current_page - 1) * 10:current_page * 10]
    else:
        current_page = 1
        recipes = filtered_recipes[:10]
    return RecipeListResponse(data=RecipeListPagination(post=[
        CompleteRecipeList(
            **RecipeList(**dict(recipe)).dict(),
            user=CurrentUser(**dict(recipe.user)),
            tags=await recipe.tags.all(),
            ingredients=await recipe.ingredients.all(),
            likes=len(await recipe.like_users.all()),
            comments_count=len(await RecipeComment.filter(recipe_id=recipe.id))
        )
        for recipe in recipes
    ], total_pages=total_pages, current_page=current_page))


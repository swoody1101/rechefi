from fastapi import APIRouter, Response, Depends, UploadFile, Request, File
from typing import Union

from starlette.responses import JSONResponse

from app.routers.accounts import get_current_user

from app.models.recipes import Recipe, Tag, Ingredient, RecipeComment, LikeRecipe, RecipeIngredient
from app.models.accounts import User
from app.schemas.accounts import CurrentUser

from app.schemas.recipes import RecipeCreateForm, TagForm, IngredientForm, IngredientRecipeForm, RecipeCommentForm, \
    RecipeCommentList
from app.schemas.common import *
from app.config import settings
from httpx import AsyncClient

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
    # 유저 인증 로직
    recipe = await Recipe.create(user_id=user.id, title=req.title, content=req.content, img_url=req.img_url)
    for ingredient in req.ingredients:
        new_ingredient, created = await Ingredient.get_or_create(name=ingredient.name)
        await RecipeIngredient.create(recipe=recipe, ingredient=new_ingredient, amount=ingredient.amount)
    await recipe.tags.add(*[tag for tag in await Tag.filter(id__in=req.tags)])
    return CommonResponse()


@router.post("/speech-to-text/", description="AI서버와 STT 데이터 통신")
async def get_stt_result(request: Request, file: UploadFile = File(...), user: User = Depends(get_current_user)):
    # async with AsyncClient(base_url='http://127.0.0.1:8001/') as client:
    client = AsyncClient()
    stt_response = await client.post(f"{settings.AI_SERVER_URL}/test", files={"file": (file.filename, file.file)})
    await file.seek(0)
    print(stt_response.content.decode())
    return JSONResponse(content=stt_response.json())


@router.get("/detail/{recipe_id}", description="레시피 상세", response_model=ObjectResponse)
async def recipe_detail(recipe_id: int):
    recipe = await Recipe.get_or_none(id=recipe_id).select_related('user')
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    else:
        recipe.views += 1
        await recipe.save()
        ingredients = [
            IngredientRecipeForm(**dict(await ingredient.ingredient), amount=ingredient.amount)
            for ingredient in await RecipeIngredient.filter(recipe_id=recipe_id)
        ]
        data = {
            "recipe": recipe,
            "user": CurrentUser(**dict(recipe.user)),
            "tags": await recipe.tags.all(),
            "ingredients": ingredients,
            "like_users": await recipe.like_users.all().values("id", "nickname"),
        }
    return ObjectResponse(data=data)


@router.get("/comment/{recipe_id}", description="레시피 댓글 리스트", response_model=MultipleObjectResponse)
async def get_comment_list(recipe_id: int):
    comments = await RecipeComment.filter(recipe_id=recipe_id).select_related('user').order_by('-id')
    data = [RecipeCommentList(**dict(comment), user=CurrentUser(**dict(comment.user))) for comment in comments]
    return MultipleObjectResponse(data=data)


@router.post("/comment/{recipe_id}", description="레시피 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_comment(recipe_id: int, req: RecipeCommentForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await RecipeComment.create(recipe_id=recipe_id, user_id=user.id, **req.dict())
    return CommonResponse()


@router.put("/comment/{comment_id}", description="레시피 댓글 수정", response_model=CommonResponse)
async def edit_comment(comment_id: int, req: RecipeCommentForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
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
    # 유저 인증 로직
    comment = await RecipeComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    else:
        if user.id == comment.user_id:
            await RecipeComment.filter(id=comment_id).delete()
        else:
            return JSONResponse(status_code=404, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.post("/like/{recipe_id}", description="레시피 좋아요", response_model=ObjectResponse, status_code=201)
async def like_recipe(recipe_id: int, response: Response, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    recipe = await Recipe.get_or_none(id=recipe_id)
    like_recipe_list = await LikeRecipe.filter(user_id=user.id, recipe_id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 레시피가 없습니다.").dict())
    else:
        data = {
            "method": "",
            "like": True
        }
        if not like_recipe_list:
            await LikeRecipe.create(user_id=user.id, recipe_id=recipe_id)
            data["method"] = 'post'
            data["like"] = True
        else:
            await LikeRecipe.filter(user_id=user.id, recipe_id=recipe_id).delete()
            data["method"] = 'delete'
            data["like"] = False
            response.status_code = 200
        data["likes_count"] = await LikeRecipe.filter(recipe_id=recipe_id).count()
        return ObjectResponse(data=data)


@router.put("/{recipe_id}", description="레시피 수정", response_model=SingleResponse)
async def edit_recipe(recipe_id: int, req: RecipeCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    else:
        if recipe.user_id == user.id:
            await recipe.update(**req.dict())
        return SingleResponse(id=recipe_id)


@router.delete("/{recipe_id}", description="레시피 삭제", response_model=CommonResponse)
async def delete_recipe(recipe_id: int, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is not None and user.id == recipe.user_id:
        await Recipe.filter(id=recipe_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    return CommonResponse()


@router.get("/{recipe_id}", description="레시피 목록 조회", response_model=ObjectResponse)
async def get_recipe_list(page: int,
                          mid: Union[int, None] = None,
                          tag: Union[str, None] = None,
                          ingredient: Union[str, None] = None):
    query = Recipe.all().prefetch_related('tags', 'ingredients').select_related('user').order_by('-id')
    if mid:
        query = query.filter(user_id=mid)
    filtered_recipes = list(await query)
    if tag:
        tags = set(map(int, tag.split(',')))
        filtered_recipes = [recipe for recipe in filtered_recipes
                            if tags.issubset(await recipe.tags.all().values_list("id", flat=True))]
    if ingredient:
        ingredients = set(ingredient.split(','))
        filtered_recipes = [recipe for recipe in filtered_recipes
                            if ingredients.issubset(await recipe.ingredients.all().values_list("name", flat=True))]
    total_pages = 1 + len(filtered_recipes)//50
    current_page = page
    if 1 <= current_page <= total_pages:
        recipes = filtered_recipes[(current_page - 1) * 50:current_page * 50]
    else:
        current_page = 1
        recipes = filtered_recipes[:50]
    post = [
        {
            **dict(recipe),
            "user": CurrentUser(**dict(recipe.user)),
            "tags": await recipe.tags.all(),
            "ingredients": await recipe.ingredients.all(),
            "likes": len(await recipe.like_users.all()),
            "comments_count": len(await RecipeComment.filter(recipe_id=recipe.id))
        }
        for recipe in recipes
    ]
    data = {
        "post": post,
        "total_pages": total_pages,
        "current_page": current_page
    }
    return ObjectResponse(data=data)


from fastapi import APIRouter, Response, status, Header, Depends
from typing import Union

from starlette.responses import JSONResponse

from app.routers.accounts import oauth2_scheme, get_current_user

from app.models.recipes import Recipe, Tag, Ingredient, RecipeComment, LikeRecipe, RecipeIngredient
from app.models.accounts import User

from app.schemas.recipes import RecipeCreateForm, TagForm, IngredientForm, IngredientRecipeForm, RecipeCommentForm, \
    RecipeCommentList
from app.schemas.common import *

router = APIRouter(prefix="/recipe", tags=["recipe"])




@router.post("/tag", description="레시피 태그 생성", response_model=CommonResponse)
async def create_tag(req: TagForm, token: str = Depends(oauth2_scheme)):
    user = await get_current_user(token)
    if user is not None and user.is_admin is True:
        await Tag.get_or_create(**req.dict())
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    return CommonResponse()


@router.post("/ingredient", description="레시피 재료 생성", response_model=CommonResponse)
async def create_ingredient(req: IngredientForm, token: str = Depends(oauth2_scheme)):
    user = await get_current_user(token)
    if user is not None and user.is_admin is True:
        await Ingredient.get_or_create(**req.dict())
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    return CommonResponse()


@router.post("/", description="레시피 작성", response_model=CommonResponse, status_code=201)
async def create_recipe(req: RecipeCreateForm, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    user = await get_current_user(token)
    if user is not None:
        recipe = await Recipe.create(user_id=user.id, title=req.title, content=req.content, img_url=req.img_url)
        for ingredient in req.ingredients:
            new_ingredient, created = await Ingredient.get_or_create(name=ingredient.name)
            await RecipeIngredient.create(recipe=recipe, ingredient=new_ingredient, amount=ingredient.amount)
        await recipe.tags.add(*[tag for tag in await Tag.filter(id__in=req.tags)])
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    return CommonResponse()


@router.get("/detail/{recipe_id}", description="레시피 상세", response_model=ObjectResponse)
async def recipe_detail(recipe_id: int):
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    else:
        ingredients = [
            IngredientRecipeForm(**dict(await ingredient.ingredient), amount=ingredient.amount)
            for ingredient in await RecipeIngredient.filter(recipe_id=recipe_id)
        ]
        data = {
            "recipe": recipe,
            "nickname": (await recipe.user).nickname,
            "tags": await recipe.tags.all(),
            "ingredients": ingredients,
            "like_users": await recipe.like_users.all().values("id", "nickname"),
            # comments = await RecipeComment.filter(recipe_id=recipe_id)
        }
    return ObjectResponse(data=data)


@router.get("/comment/{recipe_id}", description="레시피 댓글 리스트", response_model=MultipleObjectResponse, status_code=200)
async def get_comment_list(recipe_id: int):
    comments = await RecipeComment.filter(recipe_id=recipe_id)
    data = [RecipeCommentList(**dict(comment), nickname=(await comment.user).nickname) for comment in comments]
    return MultipleObjectResponse(data=data)


@router.post("/comment/{recipe_id}", description="레시피 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_comment(recipe_id: int, req: RecipeCommentForm, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    user = await get_current_user(token)
    if user is not None:
        await RecipeComment.create(recipe_id=recipe_id, user_id=user.id, **req.dict())
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    return CommonResponse()


@router.put("/comment/{comment_id}", description="레시피 댓글 수정", response_model=CommonResponse)
async def edit_comment(comment_id: int, req: RecipeCommentForm, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    user = await get_current_user(token)
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
async def delete_comment(comment_id: int, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    user = await get_current_user(token)
    comment = await RecipeComment.get_or_none(id=comment_id)
    if user.id == comment.user_id:
        await RecipeComment.filter(id=comment_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    return CommonResponse()


@router.post("/like/{recipe_id}", description="레시피 좋아요", response_model=ObjectResponse, status_code=201)
async def like_recipe(recipe_id: int, response: Response, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    recipe = await Recipe.get_or_none(id=recipe_id)
    user = await get_current_user(token)
    like_recipe_list = await LikeRecipe.filter(user_id=user.id, recipe_id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 레시피가 없습니다.").dict())
    elif user is None:
        return JSONResponse(status_code=401, content=CommonFailedResponse(detail="로그인이 필요합니다.").dict())
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
        return ObjectResponse(data=data)


@router.put("/{recipe_id}", description="레시피 수정", response_model=SingleResponse)
async def edit_recipe(recipe_id: int, req: RecipeCreateForm, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    user = await get_current_user(token)
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    else:
        if recipe.user_id == user.id:
            await recipe.update(**req.dict())
        return SingleResponse(id=recipe_id)


@router.delete("/{recipe_id}", description="레시피 삭제", response_model=CommonResponse)
async def delete_recipe(recipe_id: int, token: str = Depends(oauth2_scheme)):
    # 유저 인증 로직
    user = await get_current_user(token)
    recipe = await Recipe.get_or_none(id=recipe_id)
    if user is not None and recipe is not None and user.id == recipe.user_id:
        await Recipe.filter(id=recipe_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="").dict())
    return CommonResponse()


@router.get("/{recipe_id}", description="레시피 목록 조회", response_model=MultipleObjectResponse)
async def get_recipe_list(recipe_id: int, q: Union[str, None] = None):
    recipes = await Recipe.filter(id__gte=recipe_id)
    data = [
        {
            "title": recipe.title,
            "date": recipe.created_at,
            "user_id": recipe.user_id,
            "img_url": recipe.img_url,
            "nickname": (await recipe.user).nickname,
            "tags": await recipe.tags.all(),
            "likes": len(await recipe.like_users.all()),
            "comments_count": len(await RecipeComment.filter(recipe_id=recipe_id))
        }
        for recipe in recipes
    ]
    return MultipleObjectResponse(data=data)


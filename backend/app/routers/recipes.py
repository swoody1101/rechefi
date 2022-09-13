from fastapi import APIRouter, Response, status
from typing import Union

from starlette.responses import JSONResponse

from app.models.recipes import Recipe, Tag, Ingredient, RecipeComment, LikeRecipe, RecipeIngredient
from app.schemas.recipes import RecipeCreateForm, TagForm, IngredientForm, IngredientRecipeForm
from app.schemas.common import CommonResponse, ObjectResponse, SingleResponse, CommonFailedResponse

router = APIRouter(prefix="/recipe", tags=["recipe"])


@router.post("/tag", description="레시피 태그 생성", response_model=CommonResponse)
async def create_tag(req: TagForm):
    new_tag = await Tag.get_or_create(**req.dict())
    return CommonResponse()


@router.post("/ingredient", description="레시피 재료 생성", response_model=CommonResponse)
async def create_ingredient(req: IngredientForm):
    await Ingredient.get_or_create(**req.dict())
    return CommonResponse()


@router.post("/", description="레시피 작성", response_model=CommonResponse, status_code=201)
async def create_recipe(req: RecipeCreateForm):
    recipe = await Recipe.create(user_id=req.user_id, title=req.title, content=req.content, img_url=req.img_url)
    for ingredient in req.ingredients:
        new_ingredient, created= await Ingredient.get_or_create(name=ingredient.name)
        await RecipeIngredient.create(recipe=recipe, ingredient=new_ingredient, amount=ingredient.amount)
    await recipe.tags.add(*[tag for tag in await Tag.filter(id__in=req.tags)])
    return CommonResponse()


@router.get("/detail/{recipe_id}", description="레시피 상세", response_model=ObjectResponse)
async def recipe_detail(recipe_id: int):
    recipe = await Recipe.get(id=recipe_id)
    # like_users = await recipe.like_users.all().values("id", "nickname")
    # comments = await RecipeComment.filter(recipe_id=recipe_id)
    datas = {
        'recipe': recipe,
        # 'likes': like_users,
        # 'comments': comments
    }
    return ObjectResponse(data=datas)


@router.put("/{recipe_id}", description="레시피 수정", response_model=SingleResponse)
async def edit_recipe(recipe_id: int, req: RecipeCreateForm):
    recipe = await Recipe.get_or_none(id=recipe_id)
    if recipe is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 레시피입니다.").dict())
    else:
        await recipe.update(**req.dict())
        return SingleResponse(id=recipe_id)


@router.post("/{recipe_id}", description="레시피 삭제", response_model=CommonResponse)
async def delete_recipe(recipe_id: int):
    await Recipe.filter(id=recipe_id).delete()
    return CommonResponse()


@router.get("/{recipe_id}")
async def get_recipe_list(recipe_id: int, q: Union[str, None] = None):
    recipes = await Recipe.filter(id__gte=recipe_id)
    if q:
        return {"recipe_id": recipe_id, "q": q}
    return {"recipe_id": recipe_id}


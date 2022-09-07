from fastapi import APIRouter
from typing import Union
from app.models.recipes import Recipe
from app.schemas.recipes import RecipeCreateForm
from app.schemas.common import CommonResponse

router = APIRouter(prefix="/recipe", tags=["recipe"])


@router.get("/{recipe_id}")
async def get_recipe_list(recipe_id: int, q: Union[str, None] = None):
    recipes = await Recipe.filter(id >= recipe_id)
    if q:
        return {"recipe_id": recipe_id, "q": q}
    return {"recipe_id": recipe_id}


@router.post("/", description="레시피 작성", response_model=CommonResponse)
async def create_recipe(req: RecipeCreateForm):
    await Recipe.create(**req.dict())
    return CommonResponse()


@router.post("/detail/{recipe_id}", description="레시피 상세", response_model=CommonResponse)
async def recipe_detail(recipe_id: int):
    recipe = await Recipe.get(id=recipe_id)
    like_users = recipe.like_users.all()
    comments = recipe.comments.all()
    return [recipe, like_users, comments]


@router.put("/{recipe_id}", description="레시피 수정", response_model=CommonResponse)
async def edit_recipe(recipe_id: int, req: RecipeCreateForm):
    await Recipe.filter(id=recipe_id).update(**req.dict())
    return CommonResponse()


@router.post("/{recipe_id}", description="레시피 삭제", response_model=CommonResponse)
async def delete_recipe(recipe_id: int):
    await Recipe.filter(id=recipe_id).delete()
    return CommonResponse()

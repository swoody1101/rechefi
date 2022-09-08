from fastapi import APIRouter
from typing import Union
from app.models.recipes import Recipe, Tag, Ingredient, RecipeComment, LikeRecipe, RecipeIngredient
from app.schemas.recipes import RecipeCreateForm, TagForm, IngredientForm, IngredientRecipeForm
from app.schemas.common import CommonResponse, ObjectResponse, SingleResponse

router = APIRouter(prefix="/recipe", tags=["recipe"])


@router.post("/tag", description="레시피 태그 생성", response_model=CommonResponse)
async def create_tag(req: TagForm):
    await Tag.create(**req.dict())
    return CommonResponse()


@router.post("/ingredient", description="레시피 재료 생성", response_model=CommonResponse)
async def create_ingredient(req: IngredientForm):
    await Ingredient.create(**req.dict())
    return CommonResponse()


@router.post("/", description="레시피 작성", response_model=CommonResponse)
async def create_recipe(req: RecipeCreateForm):
    recipe = await Recipe.create(user_id=req.user_id, title=req.title, content=req.content, img_url=req.img_url)
    for ingredient in req.ingredients:
        new_ingredient = await Ingredient.get_or_create(name=ingredient.name)
        await RecipeIngredient.create(recipe_id=recipe.pk, ingredient_id=new_ingredient.id, amount=ingredient.amount)
    await recipe.tags.add(*[tag for tag in await Tag.filter(id__in=req.tags)])
    return CommonResponse()


@router.get("/detail/{recipe_id}", description="레시피 상세", response_model=ObjectResponse)
async def recipe_detail(recipe_id: int):
    recipe = await Recipe.get(id=recipe_id)
    print(recipe)
    # like_users = recipe.like_users.all()
    # comments = recipe.comments.all()
    return ObjectResponse(data=recipe)


@router.put("/{recipe_id}", description="레시피 수정", response_model=SingleResponse)
async def edit_recipe(recipe_id: int, req: RecipeCreateForm):
    await Recipe.filter(id=recipe_id).update(**req.dict())
    return SingleResponse(id=recipe_id)


@router.post("/{recipe_id}", description="레시피 삭제", response_model=CommonResponse)
async def delete_recipe(recipe_id: int):
    await Recipe.filter(id=recipe_id).delete()
    return CommonResponse()


@router.get("/{recipe_id}")
async def get_recipe_list(recipe_id: int, q: Union[str, None] = None):
    recipes = await Recipe.filter(id >= recipe_id)
    if q:
        return {"recipe_id": recipe_id, "q": q}
    return {"recipe_id": recipe_id}


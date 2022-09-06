from pydantic import BaseModel, Field


class Recipe(BaseModel):
    title: str
    content: str
    img_url: str = Field(nullable=True)
    created_at: str
    updated_at: str
    tags: str
    ingredients: str

class RecipeCreateForm(Recipe):
    pass


class RecipeList(BaseModel):
    pass
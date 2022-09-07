from typing import List, Union

from pydantic import BaseModel, Field


class Recipe(BaseModel):
    title: str
    content: str
    img_url: str = Field(nullable=True)
    created_at: str
    updated_at: str
    tags: List[str] = []
    ingredients: List[str] = []


class RecipeCreateForm(Recipe):
    pass


class RecipeList(BaseModel):
    pass
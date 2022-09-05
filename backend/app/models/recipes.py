from tortoise import fields, Model


class Recipe(Model):
    user = fields.ForeignKeyField('b303.User', related_name='recipes', description='레시피 작성자')
    title = fields.CharField(max_length=50)
    content = fields.CharField(max_length=10000)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    img_url = fields.CharField(max_length=200, null=True, description='썸네일 이미지')
    like_users = fields.ManyToManyField('b303.User', through='likerecipe', related_name='like_recipes')
    tags = fields.ManyToManyField('b303.Tag', related_name='tagged_recipes', on_delete='CASCADE', description='레시피 관련 태그')
    ingredients = fields.ManyToManyField('b303.Ingredient', related_name='using_recipes', through='recipeingredient', description='레시피 사용 재료ㅋ')


class LikeRecipe(Model):
    user = fields.ForeignKeyField('b303.User',on_delete='CASCADE')
    article = fields.ForeignKeyField('b303.Recipe', on_delete='CASCADE')
    created_at = fields.DatetimeField(auto_now_add=True)


class RecipeIngredient(Model):
    recipe = fields.ForeignKeyField('b303.Recipe',on_delete='CASCADE')
    ingredient = fields.ForeignKeyField('b303.Ingredient', on_delete='CASCADE')
    amount = fields.IntField(null=True)


class Tag(Model):
    name = fields.CharField(max_length=30)


class Ingredient(Model):
    name = fields.CharField(max_length=30)


class RecipeComment(Model):
    user = fields.ForeignKeyField('b303.User', related_name='recipe_comments')
    recipe = fields.ForeignKeyField('b303.Recipe', related_name='comments', on_delete='CASCADE')
    content = fields.CharField(max_length=500)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    root = fields.IntField(default=0)
    group = fields.IntField(default=0)
    sequence = fields.IntField(default=0)

from tortoise import fields, Model


class Article(Model):
    user = fields.ForeignKeyField('b303.User', related_name='articles', description='글 작성자')
    title = fields.CharField(max_length=50)
    content = fields.CharField(max_length=10000)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    category = fields.IntField(default=0, description='글 분류, 0 = .., 1 = .., 2 = ..')
    img_url = fields.CharField(max_length=200, null=True, description='썸네일 이미지')
    views = fields.IntField(default=0)
    recipe = fields.ForeignKeyField('b303.Recipe', related_name='articles', through='article_recipe',
                                    db_constraint=False, description='해당 게시물에 참조된 레시피', null=True)
    like_users = fields.ManyToManyField('b303.User', through='likearticle', related_name='like_articles')

    async def update(self, title, content, img_url, category=None):
        self.title = title
        self.content = content
        self.img_url = img_url
        if category is not None:
            self.category = category
        await self.save()


class LikeArticle(Model):
    user = fields.ForeignKeyField('b303.User', on_delete='CASCADE')
    article = fields.ForeignKeyField('b303.Article', on_delete='CASCADE')
    created_at = fields.DatetimeField(auto_now_add=True)


class ArticleComment(Model):
    user = fields.ForeignKeyField('b303.User', related_name='article_comments')
    article = fields.ForeignKeyField('b303.Article', related_name='comments', on_delete='CASCADE')
    content = fields.CharField(max_length=500)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    root = fields.IntField(default=0)
    group = fields.IntField(default=0)
    sequence = fields.IntField(default=0)


class Notice(Model):
    user = fields.ForeignKeyField('b303.User', related_name='notices', description='공지 작성자')
    title = fields.CharField(max_length=50)
    content = fields.CharField(max_length=10000)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    category = fields.IntField(default=0, description='글 분류, 0 = .., 1 = .., 2 = ..')
    img_url = fields.CharField(max_length=200, null=True, description='썸네일 이미지')
    views = fields.IntField(default=0)
    recipe = fields.ForeignKeyField('b303.Recipe', related_name='notices', through='notice_recipe',
                                    db_constraint=False, description='해당 게시물에 참조된 레시피', null=True)

    async def update(self, title, content, img_url, category=None):
        self.title = title
        self.content = content
        self.img_url = img_url
        if category is not None:
            self.category = category
        await self.save()


class Cooking(Model):
    user = fields.ForeignKeyField('b303.User', related_name='cookings', description='갤러리 작성자')
    title = fields.CharField(max_length=50)
    content = fields.CharField(max_length=10000)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    category = fields.IntField(default=0, description='글 분류, 0 = .., 1 = .., 2 = ..')
    img_url = fields.CharField(max_length=200, description='썸네일 이미지')
    views = fields.IntField(default=0)
    recipe = fields.ForeignKeyField('b303.Recipe', related_name='cookings', through='cooking_recipe',
                                    db_constraint=False, description='해당 게시물에 참조된 레시피', null=True)
    like_users = fields.ManyToManyField('b303.User', through='likecooking', related_name='like_cookings')

    async def update(self, title, content, img_url, category=None, recipe_id=None):
        self.title = title
        self.content = content
        self.img_url = img_url
        if category is not None:
            self.category = category
        if recipe_id is not None:
            self.recipe_id = recipe_id
        await self.save()


class LikeCooking(Model):
    user = fields.ForeignKeyField('b303.User', on_delete='CASCADE')
    cooking = fields.ForeignKeyField('b303.Cooking', on_delete='CASCADE')
    created_at = fields.DatetimeField(auto_now_add=True)


class CookingComment(Model):
    user = fields.ForeignKeyField('b303.User', related_name='cooking_comments')
    cooking = fields.ForeignKeyField('b303.Cooking', related_name='comments', on_delete='CASCADE')
    content = fields.CharField(max_length=500)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    root = fields.IntField(default=0)
    group = fields.IntField(default=0)
    sequence = fields.IntField(default=0)

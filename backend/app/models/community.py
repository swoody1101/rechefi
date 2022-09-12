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
    recipe = fields.ForeignKeyField('b303.Recipe', related_name='articles', through='article_recipe', db_constraint=False, description='해당 게시물에 참조된 레시피')
    like_users = fields.ManyToManyField('b303.User', through='likearticle', related_name='like_articles')


class LikeArticle(Model):
    user = fields.ForeignKeyField('b303.User',on_delete='CASCADE')
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
from tortoise import fields, Model


class User(Model):
    email = fields.CharField(max_length=30)
    nickname = fields.CharField(max_length=20)
    password = fields.CharField(max_length=100)
    img_url = fields.CharField(max_length=200, null=True, description='프로필 사진 url')
    about_me = fields.CharField(max_length=300, null=True, description='자기소개 글')
    is_active = fields.BooleanField(default=True)
    is_admin = fields.BooleanField(default=False)
    following = fields.ManyToManyField('b303.User', through='follow', related_name='followers')
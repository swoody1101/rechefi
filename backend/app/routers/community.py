from fastapi import APIRouter, Response, status, Header, Depends
from typing import Union

from starlette.responses import JSONResponse

from app.routers.accounts import get_current_user

from app.models.community import Article, ArticleComment, LikeArticle, Notice, Cooking, CookingComment, LikeCooking
from app.models.accounts import User

from app.schemas.community import ArticleCreateForm, ArticleCommentForm, ArticleCommentList, ArticleDetail
from app.schemas.common import *

router = APIRouter(prefix="/community", tags=["community"])

# category / 0: notice / 1: free-board / 2: gallery


@router.post("/notice-board", description="공지사항 작성", response_model=CommonResponse, status_code=201)
async def create_notice(req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await Notice.create(user_id=user.id, category=0, **req.dict())
    return CommonResponse()
@router.get("/notice-board/detail/{article_id}", description="공지사항 상세", response_model=ObjectResponse)
async def notice_detail(article_id: int):
    article = await Article.get_or_none(id=article_id).select_related('user')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    data = ArticleDetail(
        nickname=article.user.nickname,
        like_users=await article.like_users.all().values("id", "nickname"),
        comments=[
            ArticleCommentList(nickname=comment.user.nickname, **dict(comment))
            for comment in await article.comments.all().select_related('user')
        ],
        **dict(article)
    )
    return ObjectResponse(data=data)


@router.put("/notice-board/{article_id}", description="공지사항 수정", response_model=SingleResponse)
async def edit_notice(article_id: int, req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Article.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    else:
        if article.user_id == user.id:
            await article.update(**req.dict())
        else:
            return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
        return SingleResponse(id=article_id)


@router.delete("/notice-board/{article_id}", description="공지사항 삭제", response_model=CommonResponse)
async def delete_notice(article_id: int, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Article.get_or_none(id=article_id)
    if article is not None and user.id == article.user_id:
        await Article.filter(id=article_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    return CommonResponse()


@router.post("/free-board", description="게시물 작성", response_model=CommonResponse, status_code=201)
async def create_article(req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await Article.create(user_id=user.id, **req.dict())
    return CommonResponse()


@router.get("/free-board/detail/{article_id}", description="게시물 상세", response_model=ObjectResponse)
async def article_detail(article_id: int):
    article = await Article.get_or_none(id=article_id).select_related('user')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    data = ArticleDetail(
        nickname=article.user.nickname,
        like_users=await article.like_users.all().values("id", "nickname"),
        comments=[
            ArticleCommentList(nickname=comment.user.nickname, **dict(comment))
            for comment in await article.comments.all().select_related('user')
        ],
        **dict(article)
    )
    return ObjectResponse(data=data)


@router.get("/free-board/comment/{article_id}", description="게시물 댓글 리스트", response_model=MultipleObjectResponse)
async def get_article_comment_list(article_id: int):
    comments = await ArticleComment.filter(article_id=article_id).select_related('user')
    data = [ArticleCommentList(**dict(comment), nickname=comment.user.nickname) for comment in comments]
    return MultipleObjectResponse(data=data)


@router.post("/free-board/comment/{article_id}", description="게시물 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_article_comment(article_id: int, req: ArticleCommentForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await ArticleComment.create(article_id=article_id, user_id=user.id, **req.dict())
    return CommonResponse()


@router.put("/free-board/comment/{comment_id}", description="게시물 댓글 수정", response_model=CommonResponse)
async def edit_article_comment(comment_id: int, req: ArticleCommentForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    comment = await ArticleComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    else:
        if user.id == comment.user_id:
            comment.content = req.content
            await comment.save()
        else:
            return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.delete("/free-board/comment/{comment_id}", description="게시물 댓글 삭제", response_model=CommonResponse)
async def delete_article_comment(comment_id: int, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    comment = await ArticleComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    else:
        if user.id == comment.user_id:
            await ArticleComment.filter(id=comment_id).delete()
        else:
            return JSONResponse(status_code=404, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.post("/free-board/like/{article_id}", description="게시물 좋아요", response_model=ObjectResponse, status_code=201)
async def like_article(article_id: int, response: Response, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Article.get_or_none(id=article_id)
    like_article_list = await LikeArticle.filter(user_id=user.id, article_id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 게시물이 없습니다.").dict())
    else:
        data = {
            "method": "",
            "like": True
        }
        if not like_article_list:
            await LikeArticle.create(user_id=user.id, article_id=article_id)
            data["method"] = 'post'
            data["like"] = True
        else:
            await LikeArticle.filter(user_id=user.id, article_id=article_id).delete()
            data["method"] = 'delete'
            data["like"] = False
            response.status_code = 200
        return ObjectResponse(data=data)


@router.put("/free-board/{article_id}", description="게시물 수정", response_model=SingleResponse)
async def edit_article(article_id: int, req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Article.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    else:
        if article.user_id == user.id:
            await article.update(**req.dict())
        else:
            return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
        return SingleResponse(id=article_id)


@router.delete("/free-board/{article_id}", description="게시물 삭제", response_model=CommonResponse)
async def delete_article(article_id: int, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Article.get_or_none(id=article_id)
    if article is not None and user.id == article.user_id:
        await Article.filter(id=article_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    return CommonResponse()


@router.post("/gallery", description="게시물 작성", response_model=CommonResponse, status_code=201)
async def create_gallery_article(req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await Article.create(user_id=user.id, category=2, **req.dict())
    return CommonResponse()

#
# @router.get("/{recipe_id}", description="게시물 목록 조회", response_model=MultipleObjectResponse)
# async def get_recipe_list(recipe_id: int, q: Union[str, None] = None):
#     recipes = await Recipe.filter(id__gte=recipe_id)
#     data = [
#         {
#             "title": recipe.title,
#             "date": recipe.created_at,
#             "user_id": recipe.user_id,
#             "img_url": recipe.img_url,
#             "nickname": (await recipe.user).nickname,
#             "tags": await recipe.tags.all(),
#             "likes": len(await recipe.like_users.all()),
#             "comments_count": len(await RecipeComment.filter(recipe_id=recipe_id))
#         }
#         for recipe in recipes
#     ]
#     return MultipleObjectResponse(data=data)


from typing import Union

from app.models.recipes import RecipeComment
from app.routers.accounts import get_current_user
from app.models.community import *
from app.models.accounts import User
from app.schemas.accounts import CurrentUser
from app.schemas.community import *
from app.schemas.common import *

from fastapi import APIRouter, Response, Depends
from starlette.responses import JSONResponse

from app.schemas.recipes import ReferencedRecipe

router = APIRouter(prefix="/community", tags=["community"])


@router.post("/notice-board", description="공지사항 작성", response_model=CommonResponse, status_code=201)
async def create_notice(req: ArticleCreateForm, user: User = Depends(get_current_user)):
    if user.is_admin is False:
        return JSONResponse(status_code=403, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    await Notice.create(user_id=user.id, **req.dict())
    return CommonResponse()


@router.get("/notice-board/detail/{article_id}", description="공지사항 상세", response_model=ArticleDetailResponse)
async def notice_detail(article_id: int):
    article = await Notice.get_or_none(id=article_id).select_related('user')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    article.views += 1
    await article.save(update_fields=("views",))
    return ArticleDetailResponse(data=NoticeDetail(
        user=CurrentUser(**dict(article.user)),
        **dict(article)
    ))


@router.put("/notice-board/{article_id}", description="공지사항 수정", response_model=SingleResponse)
async def edit_notice(article_id: int, req: ArticleCreateForm, user: User = Depends(get_current_user)):
    article = await Notice.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    if article.user_id != user.pk:
        return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    await article.update(**req.dict())
    return SingleResponse(id=article_id)


@router.delete("/notice-board/{article_id}", description="공지사항 삭제", response_model=CommonResponse)
async def delete_notice(article_id: int, user: User = Depends(get_current_user)):
    article = await Notice.get_or_none(id=article_id)
    if article is not None and user.is_admin is True:
        await Article.filter(id=article_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    return CommonResponse()


@router.post("/free-board", description="게시물 작성", response_model=CommonResponse, status_code=201)
async def create_article(req: ArticleCreateForm, user: User = Depends(get_current_user)):
    await Article.create(user_id=user.id, **req.dict())
    return CommonResponse()


@router.get("/free-board/detail/{article_id}", description="게시물 상세", response_model=ArticleDetailResponse)
async def article_detail(article_id: int):
    article = await Article.get_or_none(id=article_id).select_related('user')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    article.views += 1
    await article.save()
    return ArticleDetailResponse(data=ArticleDetail(
        user=CurrentUser(**dict(article.user)),
        like_users=await article.like_users.all().values("id", "nickname"),
        **dict(article)
    ))


@router.get("/free-board/comment/{article_id}", description="게시물 댓글 리스트", response_model=CommentListResponse)
async def get_article_comment_list(article_id: int):
    comments = await ArticleComment.filter(article_id=article_id).select_related('user').order_by('-id')
    return CommentListResponse(
        data=[
            CommentList(
                **dict(comment),
                user=CurrentUser(**dict(comment.user)),
                deleted=True if comment.group < 0 else False
            ) for comment in comments
        ]
    )


@router.post("/free-board/comment/{article_id}", description="게시물 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_article_comment(article_id: int, req: CommentForm, user: User = Depends(get_current_user)):
    await ArticleComment.create(article_id=article_id, user_id=user.id, **req.dict())
    return CommonResponse()


@router.put("/free-board/comment/{comment_id}", description="게시물 댓글 수정", response_model=CommonResponse)
async def edit_article_comment(comment_id: int, req: CommentForm, user: User = Depends(get_current_user)):
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
    comment = await ArticleComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    if user.id != comment.user_id and user.is_admin is False:
        return JSONResponse(status_code=403, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    if comment.group >= 0:
        comment.group = -(comment.group + 1)
    if comment.group < 0 and user.is_admin:
        comment.group = -(comment.group + 1)
    await comment.save(update_fields=("group",))
    return CommonResponse()


@router.post("/free-board/like/{article_id}", description="게시물 좋아요", response_model=CommonLikeArticleResponse)
async def like_article(article_id: int, response: Response, user: User = Depends(get_current_user)):
    article = await Article.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 게시물이 없습니다.").dict())
    likes, created = await LikeArticle.get_or_create(user_id=user.id, article_id=article_id)
    if not created:
        await likes.delete()
    return CommonLikeArticleResponse(
        data=CommonLikeData(
            method="post" if created else "deleted",
            like=created,
            likes_count=await LikeArticle.filter(article_id=article_id).count(),
        )
    )


@router.put("/free-board/{article_id}", description="게시물 수정", response_model=SingleResponse)
async def edit_article(article_id: int, req: ArticleCreateForm, user: User = Depends(get_current_user)):
    article = await Article.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    if article.user_id != user.id:
        return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    await article.update(**req.dict())
    return SingleResponse(id=article_id)


@router.delete("/free-board/{article_id}", description="게시물 삭제", response_model=CommonResponse)
async def delete_article(article_id: int, user: User = Depends(get_current_user)):
    article = await Article.get_or_none(id=article_id, user_id=user.pk)
    if article is None and user.is_admin is False:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    if article is None and user.is_admin:
        await Article.filter(id=article_id).delete()
    await article.delete()
    return CommonResponse()


@router.post("/gallery", description="게시물 작성", response_model=CommonResponse, status_code=201)
async def create_cooking(req: CookingCreateForm, user: User = Depends(get_current_user)):
    await Cooking.create(user_id=user.id, **req.dict())
    return CommonResponse()


@router.get("/gallery/detail/{article_id}", description="게시물 상세", response_model=ArticleDetailResponse)
async def cooking_detail(article_id: int):
    article = await Cooking.get_or_none(id=article_id).select_related('user', 'recipe')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    article.views += 1
    await article.save()
    print(article.recipe)
    data = CookingDetail(
        user=CurrentUser(**dict(article.user)),
        like_users=await article.like_users.all().values("id", "nickname"),
        recipe=ReferencedRecipe(**dict(article.recipe),
                                user=await article.recipe.user,
                                likes=len(await article.recipe.like_users.all()),
                                comments_count=len(await RecipeComment.filter(recipe_id=article.recipe.id))
                                ) if article.recipe is not None else None,
        **dict(article)
    )
    return ArticleDetailResponse(data=data)


@router.get("/gallery/comment/{article_id}", description="게시물 댓글 리스트", response_model=CommentListResponse)
async def get_cooking_comment_list(article_id: int):
    comments = await CookingComment.filter(cooking_id=article_id).select_related('user').order_by('-id')
    return CommentListResponse(
        data=[
            CommentList(
                **dict(comment),
                user=CurrentUser(**dict(comment.user)),
                deleted=True if comment.group < 0 else False
            ) for comment in comments
        ]
    )


@router.post("/gallery/comment/{article_id}", description="게시물 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_cooking_comment(article_id: int, req: ArticleCommentForm, user: User = Depends(get_current_user)):
    await CookingComment.create(cooking_id=article_id, user_id=user.id, **req.dict())
    return CommonResponse()


@router.put("/gallery/comment/{comment_id}", description="게시물 댓글 수정", response_model=CommonResponse)
async def edit_cooking_comment(comment_id: int, req: ArticleCommentForm, user: User = Depends(get_current_user)):
    comment = await CookingComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    if user.id != comment.user_id:
        return JSONResponse(status_code=403, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    comment.content = req.content
    await comment.save(update_fields=("content",))
    return CommonResponse()


@router.delete("/gallery/comment/{comment_id}", description="게시물 댓글 삭제", response_model=CommonResponse)
async def delete_cooking_comment(comment_id: int, user: User = Depends(get_current_user)):
    comment = await CookingComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    if user.id != comment.user_id and user.is_admin is False:
        return JSONResponse(status_code=403, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    if comment.group >= 0:
        comment.group = -(comment.group + 1)
    if comment.group < 0 and user.is_admin:
        comment.group = -(comment.group + 1)
    await comment.save(update_fields=("group",))
    return CommonResponse()


@router.post("/gallery/like/{article_id}", description="게시물 좋아요", response_model=CommonLikeArticleResponse)
async def like_cooking(article_id: int, response: Response, user: User = Depends(get_current_user)):
    cooking = await Cooking.get_or_none(id=article_id)
    if cooking is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 게시물이 없습니다.").dict())
    likes, created = await LikeCooking.get_or_create(user_id=user.id, cooking_id=article_id)
    if not created:
        await likes.delete()
    return CommonLikeArticleResponse(
        data=CommonLikeData(
            method="post" if created else "deleted",
            like=created,
            likes_count=await LikeCooking.filter(cooking_id=article_id).count(),
        )
    )


@router.put("/gallery/{article_id}", description="게시물 수정", response_model=SingleResponse)
async def edit_cooking(article_id: int, req: CookingCreateForm, user: User = Depends(get_current_user)):
    article = await Cooking.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    if article.user_id != user.id:
        return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    await article.update(**req.dict())
    return SingleResponse(id=article_id)


@router.delete("/gallery/{article_id}", description="게시물 삭제", response_model=CommonResponse)
async def delete_cooking(article_id: int, user: User = Depends(get_current_user)):
    article = await Cooking.get_or_none(id=article_id)
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    if user.id == article.user_id or user.is_admin:
        await article.delete()
    return CommonResponse()


@router.get("/free-board/{page}", description="게시물 목록 조회", response_model=ArticleListResponse)
async def get_article_list(page: int, q: Union[str, None] = None, opt: Union[str, None] = None):
    query = Article.all().select_related('user').order_by('-id')
    if opt == "title":
        query = query.filter(title__contains=q)
    elif opt == "author":
        query = query.filter(user__nickname__contains=q)
    articles = await query
    pages = 1 + len(articles) // 10
    current_page = page
    if 1 <= page <= pages:
        articles = articles[(page - 1) * 10:page * 10]
    else:
        current_page = 1
        articles = articles[:10]
    post = [
        CompleteArticleList(
            **dict(article),
            likes=len(await article.like_users.all()),
            comments_count=len(await ArticleComment.filter(article_id=article.id)),
            user=CurrentUser(**dict(article.user)).dict()
        )
        for article in articles
    ]
    return ArticleListResponse(data=ArticleListPagination(posts=post, total_pages=pages, current_page=current_page))


@router.get("/notice-board/{page}", description="공지사항 목록 조회", response_model=ArticleListResponse)
async def get_notice_list(page: int, q: Union[str, None] = None, opt: Union[str, None] = None):
    query = Notice.all().select_related('user').order_by('-id')
    if opt == "title":
        query = query.filter(title__contains=q)
    elif opt == "author":
        query = query.filter(user__nickname__contains=q)
    articles = await query
    pages = 1 + len(articles) // 10
    current_page = page
    if 1 <= page <= pages:
        articles = articles[(page - 1) * 10:page * 10]
    else:
        current_page = 1
        articles = articles[:10]
    post = [ArticleList(**dict(article), user=CurrentUser(**dict(article.user))) for article in articles]
    return ArticleListResponse(data=ArticleListPagination(posts=post, total_pages=pages, current_page=current_page))


@router.get("/gallery/search-by-id/{page}", description="유저 id로 작성된 요리자랑 목록 조회", response_model=ArticleListResponse)
async def get_cooking_list_by_id(page: int, mid: int):
    cooking = await Cooking.filter(user_id=mid).select_related('user').order_by('-id')
    pages = 1 + len(cooking)//15
    current_page = page
    if 1 <= page <= pages:
        cooking = cooking[(page-1)*15:page*15]
    else:
        current_page = 1
        cooking = cooking[:15]
    post = [SimpleArticleList(**dict(article)) for article in cooking]
    return ArticleListResponse(data=ArticleListPagination(posts=post, total_pages=pages, current_page=current_page))


@router.get("/gallery/{page}", description="갤러리 목록 조회", response_model=ArticleListResponse)
async def get_cooking_list(page: int, q: Union[str, None] = None, opt: Union[str, None] = None):
    query = Cooking.all().select_related('user').order_by('-id')
    if opt == "title":
        query = query.filter(title__contains=q)
    elif opt == "author":
        query = query.filter(user__nickname__contains=q)
    cooking = await query
    pages = 1 + len(cooking)//20
    current_page = page
    if 1 <= page <= pages:
        cooking = cooking[(page-1)*20:page*20]
    else:
        current_page = 1
        cooking = cooking[:20]
    post = [
        CompleteArticleList(
            **dict(article),
            user=CurrentUser(**dict(article.user)),
            likes=len(await article.like_users.all()),
            comments_count=len(await CookingComment.filter(cooking_id=article.id))
        )
        for article in cooking
    ]
    return ArticleListResponse(data=ArticleListPagination(posts=post, total_pages=pages, current_page=current_page))


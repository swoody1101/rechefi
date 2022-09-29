from fastapi import APIRouter, Response, status, Header, Depends
from typing import Union

from starlette.responses import JSONResponse

from app.routers.accounts import get_current_user

from app.models.community import Article, ArticleComment, LikeArticle, Notice, Cooking, CookingComment, LikeCooking
from app.models.accounts import User
from app.schemas.accounts import CurrentUser

from app.schemas.community import ArticleCreateForm, ArticleCommentForm, ArticleCommentList, ArticleDetail, \
    CookingCreateForm, NoticeDetail, CookingDetail, ArticleList
from app.schemas.common import *

router = APIRouter(prefix="/community", tags=["community"])

@router.post("/notice-board", description="공지사항 작성", response_model=CommonResponse, status_code=201)
async def create_notice(req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await Notice.create(user_id=user.id, **req.dict())
    return CommonResponse()

@router.get("/notice-board/detail/{article_id}", description="공지사항 상세", response_model=ObjectResponse)
async def notice_detail(article_id: int):
    article = await Notice.get_or_none(id=article_id).select_related('user')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    article.views += 1
    await article.save()
    data = NoticeDetail(
        user=CurrentUser(**dict(article.user)),
        **dict(article)
    )
    return ObjectResponse(data=data)


@router.put("/notice-board/{article_id}", description="공지사항 수정", response_model=SingleResponse)
async def edit_notice(article_id: int, req: ArticleCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Notice.get_or_none(id=article_id)
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
    article = await Notice.get_or_none(id=article_id)
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
    article.views += 1
    await article.save()
    data = ArticleDetail(
        user=CurrentUser(**dict(article.user)),
        like_users=await article.like_users.all().values("id", "nickname"),
        **dict(article)
    )
    return ObjectResponse(data=data)


@router.get("/free-board/comment/{article_id}", description="게시물 댓글 리스트", response_model=MultipleObjectResponse)
async def get_article_comment_list(article_id: int):
    comments = await ArticleComment.filter(article_id=article_id).select_related('user').order_by('-id')
    data = [ArticleCommentList(**dict(comment), user=CurrentUser(**dict(comment.user))) for comment in comments]
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
        data["likes_count"] = await LikeArticle.filter(article_id=article_id).count()
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
async def create_cooking(req: CookingCreateForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await Cooking.create(user_id=user.id, **req.dict())
    return CommonResponse()


@router.get("/gallery/detail/{article_id}", description="게시물 상세", response_model=ObjectResponse)
async def cooking_detail(article_id: int):
    article = await Cooking.get_or_none(id=article_id).select_related('user', 'recipe')
    if article is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    article.views += 1
    await article.save()
    data = CookingDetail(
        user=CurrentUser(**dict(article.user)),
        like_users=await article.like_users.all().values("id", "nickname"),
        **dict(article)
    )
    return ObjectResponse(data=data)


@router.get("/gallery/comment/{article_id}", description="게시물 댓글 리스트", response_model=MultipleObjectResponse)
async def get_cooking_comment_list(article_id: int):
    comments = await CookingComment.filter(cooking_id=article_id).select_related('user').order_by('-id')
    data = [ArticleCommentList(**dict(comment), user=CurrentUser(**dict(comment.user)).dict()) for comment in comments]
    return MultipleObjectResponse(data=data)


@router.post("/gallery/comment/{article_id}", description="게시물 댓글 작성", response_model=CommonResponse, status_code=201)
async def create_cooking_comment(article_id: int, req: ArticleCommentForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    await CookingComment.create(cooking_id=article_id, user_id=user.id, **req.dict())
    return CommonResponse()


@router.put("/gallery/comment/{comment_id}", description="게시물 댓글 수정", response_model=CommonResponse)
async def edit_cooking_comment(comment_id: int, req: ArticleCommentForm, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    comment = await CookingComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    else:
        if user.id == comment.user_id:
            comment.content = req.content
            await comment.save()
        else:
            return JSONResponse(status_code=401, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.delete("/gallery/comment/{comment_id}", description="게시물 댓글 삭제", response_model=CommonResponse)
async def delete_cooking_comment(comment_id: int, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    comment = await CookingComment.get_or_none(id=comment_id)
    if comment is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 댓글입니다.").dict())
    else:
        if user.id == comment.user_id:
            await ArticleComment.filter(id=comment_id).delete()
        else:
            return JSONResponse(status_code=404, content=CommonFailedResponse(detail="권한이 없습니다.").dict())
    return CommonResponse()


@router.post("/gallery/like/{article_id}", description="게시물 좋아요", response_model=ObjectResponse, status_code=201)
async def like_cooking(article_id: int, response: Response, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    cooking = await Cooking.get_or_none(id=article_id)
    like_cooking_list = await LikeCooking.filter(user_id=user.id, cooking_id=article_id)
    if cooking is None:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="추천할 게시물이 없습니다.").dict())
    else:
        data = {
            "method": "",
            "like": True
        }
        if not like_cooking_list:
            await LikeCooking.create(user_id=user.id, cooking_id=article_id)
            data["method"] = 'post'
            data["like"] = True
        else:
            await LikeCooking.filter(user_id=user.id, cooking_id=article_id).delete()
            data["method"] = 'delete'
            data["like"] = False
            response.status_code = 200
        data["likes_count"] = await LikeCooking.filter(cooking_id=article_id).count()
        return ObjectResponse(data=data)


@router.put("/gallery/{article_id}", description="게시물 수정", response_model=SingleResponse)
async def edit_cooking(article_id: int, req: CookingCreateForm, user: User = Depends(get_current_user)):
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


@router.delete("/gallery/{article_id}", description="게시물 삭제", response_model=CommonResponse)
async def delete_cooking(article_id: int, user: User = Depends(get_current_user)):
    # 유저 인증 로직
    article = await Cooking.get_or_none(id=article_id)
    if article is not None and user.id == article.user_id:
        await Cooking.filter(id=article_id).delete()
    else:
        return JSONResponse(status_code=404, content=CommonFailedResponse(detail="없는 게시물입니다.").dict())
    return CommonResponse()


@router.get("/free-board/{page}", description="게시물 목록 조회", response_model=ObjectResponse)
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
        {
            **ArticleList(**dict(article)).dict(),
            "likes": len(await article.like_users.all()),
            "comments_count": len(await ArticleComment.filter(article_id=article.id)),
            "user": CurrentUser(**dict(article.user)).dict()
        }
        for article in articles
    ]
    data = {
        'posts': post,
        'total_pages': pages,
        'current_page': current_page
    }
    return ObjectResponse(data=data)


@router.get("/notice-board/{page}", description="공지사항 목록 조회", response_model=ObjectResponse)
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

    post = [
        {
            **ArticleList(**dict(article)).dict(),
            "user": CurrentUser(**dict(article.user))
        }
        for article in articles
    ]
    data = {
        'posts': post,
        'total_pages': pages,
        'current_page': current_page
    }
    return ObjectResponse(data=data)


@router.get("/gallery/search-by-id/{page}", description="유저 id로 작성된 요리자랑 목록 조회", response_model=ObjectResponse)
async def get_cooking_list_by_id(page: int, mid: int):
    cooking = await Cooking.filter(user_id=mid).select_related('user').order_by('-id')
    pages = 1 + len(cooking)//50
    current_page = page
    if 1 <= page <= pages:
        cooking = cooking[(page-1)*50:page*50]
    else:
        current_page = 1
        cooking = cooking[:50]
    post = [
        {
            **ArticleList(**dict(article)).dict(),
            "user": CurrentUser(**dict(article.user)),
            "likes": len(await article.like_users.all()),
            "comments_count": len(await CookingComment.filter(cooking_id=article.id)),
        }
        for article in cooking
    ]
    data = {
        'posts': post,
        'total_pages': pages,
        'current_page': current_page
    }
    return ObjectResponse(data=data)


@router.get("/gallery/{page}", description="갤러리 목록 조회", response_model=ObjectResponse)
async def get_cooking_list(page: int, q: Union[str, None] = None, opt: Union[str, None] = None):
    query = Cooking.all().select_related('user').order_by('-id')
    if opt == "title":
        query = query.filter(title__contains=q)
    elif opt == "author":
        query = query.filter(user__nickname__contains=q)
    cooking = await query
    pages = 1 + len(cooking)//50
    current_page = page
    if 1 <= page <= pages:
        cooking = cooking[(page-1)*50:page*50]
    else:
        current_page = 1
        cooking = cooking[:50]

    post = [
        {
            **ArticleList(**dict(article)).dict(),
            "user": CurrentUser(**dict(article.user)),
            "likes": len(await article.like_users.all()),
            "comments_count": len(await CookingComment.filter(cooking_id=article.id)),
        }
        for article in cooking
    ]
    data = {
        'posts': post,
        'total_pages': pages,
        'current_page': current_page
    }
    return ObjectResponse(data=data)


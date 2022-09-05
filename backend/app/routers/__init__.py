from fastapi import APIRouter


from app.routers import accounts, community, recipes

router = APIRouter(
    # prefix="/project",
)

router.include_router(accounts.router)
router.include_router(community.router)
router.include_router(recipes.router)

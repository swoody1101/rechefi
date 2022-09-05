from fastapi import APIRouter

router = APIRouter(prefix="/recipe", tags=["recipe"])


@router.get("/")
async def index():
    return


@router.post("/")
async def create():
    return
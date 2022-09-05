from fastapi import APIRouter

router = APIRouter(prefix="/community", tags=["community"])


@router.get("/")
async def index():
    return


@router.post("/")
async def create():
    return
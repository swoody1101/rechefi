import asyncio
from collections.abc import AsyncIterator

import pytest
from httpx import AsyncClient
from tortoise import Tortoise
from tortoise.exceptions import DBConnectionError

from app.config import TORTOISE_ORM
from app.main import app

TEST_BASE_URL = "http://test"


@pytest.fixture(autouse=True)
def initialize():
    loop = asyncio.get_event_loop()

    try:
        loop.run_until_complete(Tortoise.init(TORTOISE_ORM))
    except DBConnectionError:
        pass
    else:
        loop.run_until_complete(Tortoise._drop_databases())

    loop.run_until_complete(Tortoise.init(TORTOISE_ORM, _create_db=True))
    loop.run_until_complete(Tortoise.generate_schemas(safe=False))
    yield
    loop.run_until_complete(Tortoise._drop_databases())


@pytest.fixture
async def async_client() -> AsyncIterator[AsyncClient]:
    async with AsyncClient(app=app, base_url=TEST_BASE_URL) as client:
        yield client
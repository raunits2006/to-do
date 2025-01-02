import pytest
from httpx import AsyncClient
from main import app

@pytest.mark.asyncio
async def test_create_todo():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/todos/newtodo", json={"todo_name": "test_todo"})
    assert response.status_code == 200
    assert response.json() == {"todo_name": "test_todo", "id": 1}

@pytest.mark.asyncio
async def test_read_todos():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/todos")
    assert response.status_code == 200
    assert response.json() == [{"todo_name": "test_todo", "id": 1}]

@pytest.mark.asyncio
async def test_complete_todo():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/todos/completed", json={"todo_name": "test_todo", "id": 1})
    assert response.status_code == 200
    assert response.json() == {"todo_name": "test_todo", "id": 1}
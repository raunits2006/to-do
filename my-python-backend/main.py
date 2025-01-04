from fastapi import FastAPI
from models import CreateTodoPayload, UniversalTodoPayload, todos
from database import database, create_database
from contextlib import asynccontextmanager
from sqlalchemy import update
from fastapi.middleware.cors import CORSMiddleware




@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    create_database()
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://to-do-front-i3j8.onrender.com/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/todos")
async def create_todo(todo: CreateTodoPayload):
    query = todos.insert().values(
        todo_name=todo.todo_name,
        todo_completion=False
    )
    last_record_id = await database.execute(query)
    return {**todo.model_dump(), "todo_id": todo.todo_id}

@app.get("/todos")
async def read_todos():
    print("handling read todos")
    query = todos.select()
    return await database.fetch_all(query)

@app.put("/todos/complete")
async def complete_todo(todo: UniversalTodoPayload):
    query = todos.update().where(todos.c.todo_id == todo.todo_id).values(todo_completion=True)
    await database.execute(query)
    return {**todo.model_dump(), "todo_id": todo.todo_id}

@app.delete("/todos/delete")
async def delete_todo(todo: UniversalTodoPayload):
    query = todos.delete().where(todos.c.todo_id == todo.todo_id)
    await database.execute(query)
    return {"message": "Todo deleted"}


if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 10000))
    uvicorn.run(app, host=host, port=port)

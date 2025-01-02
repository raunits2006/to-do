from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Table, Column, Integer, String, Boolean
from database import metadata


class CreateTodoPayload(BaseModel):
    todo_id: Optional[int]
    todo_name: str

class UniversalTodoPayload(BaseModel):
    todo_id: int


todos = Table(
    "todos",
    metadata,
    Column("todo_id", Integer, primary_key=True),
    Column("todo_name", String),
    Column("todo_completion", Boolean)
)

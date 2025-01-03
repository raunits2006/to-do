from sqlalchemy import create_engine, MetaData
from databases import Database
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set")

database = Database(DATABASE_URL)
metadata = MetaData()

engine = create_engine(DATABASE_URL)


def create_database():
    from models import todos
    metadata.create_all(engine)
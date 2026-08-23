from sqlmodel import SQLModel, create_engine
from  .models import Event
DATABASE_URL = "sqlite:///data/darkmirror.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

def create_db():
    SQLModel.metadata.create_all(engine)
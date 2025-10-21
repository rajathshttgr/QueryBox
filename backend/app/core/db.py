import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

def is_docker() -> bool:
    return os.path.exists("/.dockerenv") or os.getenv("DOCKER_ENV") == "1"

DATABASE_URL = settings.DATABASE_URL

if not DATABASE_URL:
    POSTGRES_SERVER = settings.POSTGRES_SERVER_DOCKER if is_docker() else settings.POSTGRES_SERVER_LOCAL
    DATABASE_URL = (
        f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
        f"{POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
    )

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

import os
from celery import Celery
from app.core.config import settings

def is_docker() -> bool:
    return os.path.exists("/.dockerenv") or os.getenv("DOCKER_ENV") == "1"

redis_host = "redis" if is_docker() else settings.REDIS_HOST
redis_port = settings.REDIS_PORT

celery_app = Celery(
    "worker",
    broker=f"redis://{redis_host}:{redis_port}/0",
    backend=f"redis://{redis_host}:{redis_port}/0"
)

celery_app.autodiscover_tasks(["app.services"])

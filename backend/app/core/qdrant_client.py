import os
from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.core.config import settings

def is_docker() -> bool:
    return os.path.exists("/.dockerenv") or os.getenv("DOCKER_ENV") == "1"

qdrant_host = "qdrant" if is_docker() else settings.QDRANT_HOST
qdrant_port = settings.QDRANT_PORT

qdrant_client = QdrantClient(
    host=qdrant_host,
    port=qdrant_port
)

COLLECTION_NAME = "documents"

def init_qdrant():
    try:
        if not qdrant_client.collection_exists(COLLECTION_NAME):
            qdrant_client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=models.VectorParams(
                    size=1536,
                    distance=models.Distance.COSINE
                )
            )
        print(f"Qdrant collection '{COLLECTION_NAME}' ready ✅")
    except Exception as e:
        print(f"Error initializing Qdrant: {e}")

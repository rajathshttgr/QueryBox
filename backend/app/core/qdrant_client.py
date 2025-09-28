from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.core.config import settings

qdrant_client = QdrantClient(
    host=settings.QDRANT_HOST, 
    port=settings.QDRANT_PORT  
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



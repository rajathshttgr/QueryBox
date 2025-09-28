import uuid
from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.core.qdrant_client import qdrant_client, COLLECTION_NAME

def store_embedding(doc_id: str, text: str, embedding: list[float], metadata: dict = None):
    point_id = str(uuid.uuid4())
    payload = {
        "doc_id": doc_id,
        "text": text,
        **(metadata or {})
    }

    qdrant_client.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            models.PointStruct(
                id=point_id,
                vector=embedding,
                payload=payload
            )
        ]
    )
    return point_id

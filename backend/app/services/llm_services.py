from app.utils import get_embedding
from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.core.qdrant_client import qdrant_client, COLLECTION_NAME
from uuid import UUID
from app.utils.generate_response import generate_response

def llm_query(doc_id: UUID, query_content:str):
    search_result = qdrant_client.search(
    collection_name=COLLECTION_NAME,
    query_vector=get_embedding(query_content),
    limit=3,
    query_filter=models.Filter(
        must=[
            models.FieldCondition(
                key="doc_id",
                match=models.MatchValue(value=doc_id)
            )
        ]
    ))

    if not search_result:
        return "No matching result found."

    context_text = "\n\n".join([r.payload.get("text", "") for r in search_result])

    return generate_response(context_text, query_content)

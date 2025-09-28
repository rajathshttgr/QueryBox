from app.core.openai_client import client

def get_embedding(text: str) -> list[float]:
    """
    Get vector embedding for given text using OpenAI API.
    """
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

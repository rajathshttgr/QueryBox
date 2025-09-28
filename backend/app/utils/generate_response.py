from app.core.openai_client import client


def generate_response(retrieved_text: str, query: str, model: str = "gpt-4.1-nano") -> str:
    """
    Calls OpenAI API to generate a response given retrieved text + user query.
    """
    try:
        prompt = (
            f"You are an AI assistant. Use the following retrieved context to answer the query.\n\n"
            f"Context:\n{retrieved_text}\n\n"
            f"Question:\n{query}\n\n"
            "Answer:"
        )

        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"OpenAI API error: {e}")
        return "Failed to generate response."

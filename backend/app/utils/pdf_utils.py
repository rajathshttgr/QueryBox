from pypdf import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extract_text_chunks_from_pdf(file_path: str, chunk_size: int = 500, chunk_overlap: int = 50) -> list[str]:
    """
    Extract text from a PDF file and split into chunks.

    Args:
        file_path (str): Path to the local PDF file
        chunk_size (int): Max characters per chunk
        chunk_overlap (int): Overlap between chunks

    Returns:
        list[str]: List of text chunks
    """
    text_content = []
    try:
        reader = PdfReader(file_path)
        for page_num, page in enumerate(reader.pages, start=1):
            try:
                text = page.extract_text()
                if text:
                    text_content.append(text)
            except Exception as e:
                print(f"Error extracting page {page_num}: {e}")
                continue
    except Exception as e:
        raise RuntimeError(f"Failed to read PDF {file_path}: {e}")

    full_text = "\n".join(text_content).strip()

    if not full_text:
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    chunks = splitter.split_text(full_text)
    return chunks

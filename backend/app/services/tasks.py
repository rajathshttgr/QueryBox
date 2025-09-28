from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.core.celery_app import celery_app
from app.core.qdrant_client import qdrant_client, init_qdrant

from app.models import Docs, DocStatus
from app.utils import download_from_s3, extract_text_chunks_from_pdf, get_embedding, store_embedding
import logging
import os
from datetime import datetime

logger = logging.getLogger(__name__)

@celery_app.task
def process_document(doc_id: str):
    db: Session = SessionLocal()
    try:
        init_qdrant()
        doc = db.query(Docs).filter(Docs.id == doc_id).first()
        if not doc:
            logger.error(f"Document {doc_id} not found")
            return {"error": "Doc not found"}

        doc.status = DocStatus.PARSING
        db.commit()
        db.refresh(doc) 

        local_path = download_from_s3(doc.doc_url)
        chunks = extract_text_chunks_from_pdf(local_path)
        logger.info(f"Extracted {len(chunks)} chunks from {doc.doc_name}")
        os.remove(local_path)

        doc.status = DocStatus.EMBEDDING
        db.commit()
        db.refresh(doc)

        for idx, chunk in enumerate(chunks):
            embedding = get_embedding(chunk)
            point_id = store_embedding(
                doc_id,
                chunk,
                embedding,
                {
                    "doc_name": doc.doc_name,
                    "user_id": str(doc.user_id),
                    "chunk_id": idx
                }
            )
            logger.info(f"Stored chunk {idx+1}/{len(chunks)} with point_id={point_id}")

        doc.status = DocStatus.COMPLETED
        doc.completed_at = datetime.utcnow()
        db.commit()
        db.refresh(doc)

        return {
            "doc_id": doc_id,
            "status": "completed",
            "chunks_stored": len(chunks)
        }


    except Exception as e:
        logger.exception(f"Error processing document {doc_id}: {e}")
        if doc:
            doc.status = DocStatus.FAILED
            doc.error_message = str(e)
            db.commit()
        return {"doc_id": doc_id, "status": "failed", "error": str(e)}

    finally:
        db.close()
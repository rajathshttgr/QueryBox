from fastapi import APIRouter, Depends, status, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.core.db import get_db
from app.models import User, Docs
from app.schemas import DocResponse, DocStatus, DocUpdate
from app.services.docs_services import upload_document
from app.services.tasks import process_document
from ..utils import get_current_user

router = APIRouter()

@router.post("/upload",response_model=DocResponse,status_code=status.HTTP_201_CREATED)
async def upload_docs(file: UploadFile = File(...),current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    upload_doc = upload_document(file, current_user, db)
  
    process_document.delay(str(upload_doc.id))

    return upload_doc


@router.get("/", response_model=List[DocResponse])
def list_docs(current_user: User = Depends(get_current_user),db: Session = Depends(get_db)):
    docs = db.query(Docs).filter(Docs.user_id == current_user.id).all()
    return docs


@router.get("/{doc_id}", response_model=DocResponse)
def get_doc(doc_id: UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    doc = db.query(Docs).filter(Docs.id == doc_id, Docs.user_id == current_user.id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc


@router.delete("/{doc_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doc(doc_id: UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    doc = db.query(Docs).filter(Docs.id == doc_id, Docs.user_id == current_user.id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    db.delete(doc)
    db.commit()
    return {"detail": "Document deleted successfully"}


@router.put("/{doc_id}", response_model=DocResponse)
def update_doc(
    doc_id: UUID,
    doc_update: DocUpdate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    doc = db.query(Docs).filter(Docs.id == doc_id, Docs.user_id == current_user.id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    if doc_update.status:
        doc.status = doc_update.status
        if doc_update.status == DocStatus.COMPLETED:
            from datetime import datetime
            doc.completed_at = datetime.utcnow()
    if doc_update.error_message:
        doc.error_message = doc_update.error_message
    if doc_update.doc_name:
        doc.doc_name = doc_update.doc_name

    db.commit()
    db.refresh(doc)
    return doc



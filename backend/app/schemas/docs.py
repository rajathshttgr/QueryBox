from pydantic import BaseModel, AnyHttpUrl
from datetime import datetime
from typing import Optional, List, Any
from uuid import UUID
from app.models import DocStatus

class DocBase(BaseModel):
    doc_name: Optional[str]
    doc_url: AnyHttpUrl  

class DocResponse(DocBase):
    id: UUID
    user_id: UUID
    status: DocStatus
    uploaded_at: datetime
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None

    class Config:
        from_attributes = True

class DocUpdate(BaseModel):
    doc_name: Optional[str] = None
    status: Optional[DocStatus] = None
    error_message: Optional[str] = None

class QueryResponse(BaseModel):
    queryMatch: List[Any]

class QueryBody(BaseModel):
    user_query: str
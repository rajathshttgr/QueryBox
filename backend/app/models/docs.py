from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.core.db import Base
import enum
import uuid

class DocStatus(enum.Enum):
    PENDING = "Pending"       
    PARSING = "Parsing"        
    EMBEDDING = "Embedding"   
    COMPLETED = "Completed"    
    FAILED = "Failed"       

class Docs(Base):
    __tablename__="docs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    doc_name = Column(String, nullable=True)
    doc_url = Column(String, nullable=False)

    status = Column(Enum(DocStatus), default=DocStatus.PENDING, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    error_message = Column(Text, nullable=True)

    user = relationship("User", back_populates="docs")




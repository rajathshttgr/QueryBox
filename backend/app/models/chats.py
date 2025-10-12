from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.db import Base 

class Chats(Base):
    __tablename__ = "chats"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    chat_title = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    messages = relationship("Messages", back_populates="chat", cascade="all, delete-orphan", order_by="Messages.created_at")


class Messages(Base):
    __tablename__ = "messages"

    id =  Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    chat_id = Column(UUID(as_uuid=True), ForeignKey("chats.id"), nullable=False)

    sender = Column(String, nullable=False)   
    content = Column(String, nullable=False)  
    created_at = Column(DateTime, default=datetime.utcnow)

    chat = relationship("Chats", back_populates="messages")

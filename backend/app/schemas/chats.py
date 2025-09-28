from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from uuid import UUID


class MessageBase(BaseModel):
    sender: Optional[str] = None
    content: str


class MessageCreate(MessageBase):
    doc_id: Optional[UUID] = None


class MessageResponse(MessageBase):
    id: UUID
    chat_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True 


class ChatBase(BaseModel):
    chat_title: Optional[str] = None


class ChatCreate(ChatBase):
    pass


class ChatResponse(ChatBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    messages: List[MessageResponse] = [] 

    class Config:
        from_attributes = True

class ChatHistory(ChatBase):
    id: UUID

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.core.db import get_db
from app.models import User, Chats, Messages
from app.schemas import ChatHistory, ChatResponse, ChatCreate, MessageCreate
from ..utils import get_current_user
from app.services.llm_services import llm_query

router = APIRouter()

@router.post("/",response_model=ChatResponse,status_code=status.HTTP_201_CREATED)
def new_chat(create_chat: Optional[ChatCreate] = None, current_user: User = Depends(get_current_user),db: Session = Depends(get_db)):
    new_convo=Chats(
        user_id=current_user.id,
        chat_title=(create_chat.chat_title if create_chat and create_chat.chat_title else "New Chat")
    )
    db.add(new_convo)
    db.commit()
    db.refresh(new_convo)

    return new_convo

@router.post("/{chat_id}", status_code=status.HTTP_201_CREATED)
def chat_message(
    message_data: MessageCreate,
    chat_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        chat = db.query(Chats).filter(Chats.id == chat_id, Chats.user_id == current_user.id).first()
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found.")

        user_message = Messages(
            chat_id=chat_id,
            sender=current_user.name,
            content=message_data.content
        )

        db.add(user_message)
        db.commit()
        db.refresh(user_message)

        llm_response_text = None
        if message_data.doc_id:
            try:
                llm_response_text = llm_query(str(message_data.doc_id), message_data.content)
            except Exception as e:
                llm_response_text = "Error retrieving response from LLM."
                print(f"LLM Query Error: {e}")

        bot_message = Messages(
            chat_id=chat_id,
            sender="QueryBox Bot",
            content=llm_response_text or "No response generated."
        )

        db.add(bot_message)
        db.commit()
        db.refresh(bot_message)

        return bot_message

    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")

@router.get("/{chat_id}",response_model=ChatResponse)
def read_chat(chat_id: UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chat = (
        db.query(Chats)
        .filter(Chats.id == chat_id, Chats.user_id == current_user.id)
        .first()
    )
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

@router.delete("/{chat_id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_chat(chat_id: UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chat = db.query(Chats).filter(Chats.id == chat_id, Chats.user_id == current_user.id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Document not found")

    db.delete(chat)
    db.commit()
    return {"detail": "Chat deleted successfully"}

@router.get("/history/", response_model=List[ChatHistory])
def chat_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    chats_summary = (
        db.query(Chats)
        .filter(Chats.user_id == current_user.id)
        .order_by(Chats.created_at.desc()) 
        .all()
    )

    if not chats_summary:
        raise HTTPException(status_code=404, detail="Chat history not found")

    return [{"id": c.id, "chat_title": c.chat_title} for c in chats_summary]

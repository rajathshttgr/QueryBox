from fastapi import APIRouter
from app.api.routes import auth, user, docs, chat

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(user.router,prefix="/user", tags=["User"])
api_router.include_router(docs.router, prefix="/docs", tags=["Docs"])
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])

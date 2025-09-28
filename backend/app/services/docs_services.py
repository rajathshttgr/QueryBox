import uuid
from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException

from app.models import Docs, User, DocStatus
from app.core.aws import get_s3_client
from app.core.config import settings

AWS_REGION = settings.AWS_REGION
BUCKET_NAME = settings.BUCKET_NAME


def upload_document(file: UploadFile, current_user: User, db: Session) -> Docs:
    try:
        file_extension = file.filename.split('.')[-1]
        file_key = f"{uuid.uuid4()}.{file_extension}"

        s3_client = get_s3_client()

        s3_client.upload_fileobj(
            file.file,
            BUCKET_NAME,
            file_key,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )

        file_url = f"https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{file_key}"

        upload_doc = Docs(
            user_id=current_user.id,
            doc_name=file.filename,
            doc_url=file_url,
            status=DocStatus.PENDING 
        )

        db.add(upload_doc)
        db.commit()
        db.refresh(upload_doc)

        return upload_doc

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

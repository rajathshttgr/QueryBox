from urllib.parse import urlparse
from tempfile import NamedTemporaryFile
from app.core.aws import get_s3_client

def download_from_s3(s3_url: str) -> str:
    """
    Download file from S3 using boto3 client from core/aws.py.
    Returns the local temporary file path.
    """
    parsed = urlparse(s3_url)

    host_parts = parsed.netloc.split(".")
    if len(host_parts) < 3 or host_parts[1] != "s3":
        raise ValueError("Unexpected S3 URL format")

    bucket = host_parts[0]
    key = parsed.path.lstrip("/")

    s3 = get_s3_client()

    tmp = NamedTemporaryFile(delete=False, suffix=f".{key.split('.')[-1]}")
    with open(tmp.name, "wb") as f:
        s3.download_fileobj(bucket, key, f)

    return tmp.name

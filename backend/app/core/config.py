from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "QueryBox API"
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str
    CORS_ORIGINS: str
    
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: int
    POSTGRES_SERVER_LOCAL: str
    POSTGRES_SERVER_DOCKER: str
    ENVIRONMENT: str = "local" # local or docker

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    AWS_ACCESS_KEY_ID:str
    AWS_SECRET_ACCESS_KEY:str
    AWS_REGION:str
    BUCKET_NAME:str

    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    OPENAI_API_KEY: str
    EMBEDDING_MODEL: str

    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333

    class Config:
        """
        use env_file = ".env" if you are accessing env variables from manual .env file
        else we can ignore env_file, Pydantic will use os.environ automatically for Phase Secrets  Management
        """
        env_file=".env"
        extra = "ignore"
         
settings = Settings()
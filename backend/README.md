# QueryBox - API

A RAG-powered chatbot that retrieves relevant context from diverse sources using a vector database and generates precise, context-aware answers with an LLM

## Features

- Retrieval-Augmented Generation (RAG) for better answers.
- PostgreSQL for structured data.
- Qdrant Vector DB for embeddings.
- Background processing with Celery + Redis.
- Google OAuth authentication.
- OpenAI integration for embeddings and LLM responses.
- Dockerized for easy setup.

---

## Requirements

- Python 3.11+
- PostgreSQL 15+
- Docker & Docker Compose (for containerized setup)

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rajathshttgr/querybox.git
cd querybox/backend
```

---

### 2. Configure Environment Variables

Copy the example environment file and update secrets as needed:

```bash
cp .env.example .env
```

---

## Quick Start (Docker)

Run all services in one command:

**Requirements:** Docker & Docker Compose

1. **Build and run services:**

   ```bash
   docker-compose up -d --build
   ```

2. **Check logs:**

   ```bash
   docker-compose logs -f
   ```

3. **Stop services:**

   ```bash
   docker-compose down
   ```

4. **Access FastAPI:**
   - API: [http://localhost:8000](http://localhost:8000)
   - Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Manual Setup (Without Docker)

### 1. PostgreSQL Setup

Connect to PostgreSQL and run:

```bash
docker run -d --name template-container -e POSTGRES_PASSWORD=admin123 -p 5432:5432 postgres:15

docker exec -it template psql -U postgres
```

```sql
CREATE USER newuser WITH PASSWORD 'admin123';
CREATE DATABASE templatedb OWNER newuser;
GRANT ALL PRIVILEGES ON DATABASE templatedb TO newuser;
```

### 2. Create Python Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows PowerShell
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Migrations

```bash
alembic revision --autogenerate -m "Intial Update"
alembic upgrade head
```

### 5. Start FastAPI

```bash
uvicorn app.main:app --reload
```

## Celery for Background Tasks

```bash
 celery -A app.core.celery_app.celery_app worker --loglevel=info -P solo
```

## Connect to Databases

**Postgres:** psql -h localhost -p 5432 -U newuser -d queryboxdb

**Qdrant:** http://localhost:6333

**Redis:** redis-cli -h localhost -p 6379

---

## Notes

- Update .env with your Google OAuth and AWS keys.

- For Docker Compose, ensure .env points Postgres, Redis, and Qdrant to container hostnames (postgres, redis, qdrant) instead of localhost.

- Celery tasks are executed in the celery service container.

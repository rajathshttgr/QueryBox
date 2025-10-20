# QueryBox

A RAG-powered chatbot that retrieves relevant context from diverse sources using a vector database and generates precise, context-aware answers with an LLM.

---

## Demo

- Watch the demo recording: [https://www.loom.com/share/ea8a35c957784b0280f09998dfe10346](https://www.loom.com/share/ea8a35c957784b0280f09998dfe10346)

- Screenshots of the app are available in the [img](./img) folder.

## Features

- **Upload multiple documents:** Select and query any uploaded document.
- **Natural Language to SQL:** Hybrid RAG approach for converting questions to SQL.
- **Database integration:** Connect your database; QueryBox extracts schemas and retrieves context for LLM-generated SQL queries.
- **Context-aware answers:** LLM processes SQL results and returns precise responses.

---

## In Progress

- **Hybrid RAG Natural Language SQL Query:**  
   Connect your database, QueryBox extracts relevant schemas, LLM generates SQL queries, and the results are fed back into LLM to produce accurate, context-aware responses.

---

## Folder Structure

```
/frontend   # Next.js app
/backend    # FastAPI app
```

---

## Docker Setup

QueryBox uses Docker Compose to run the frontend, backend, and required services (PostgreSQL, Redis, Qdrant) together.

### Requirements

- Docker (>= 24.x)
- Docker Compose (included with Docker Desktop)

## Environment setup

Before running Docker, copy each directory's .env.example to .env and set required variables.

Commands (run from repo root):

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Build and Run

From the root of the repository:

1. **Build all services:**
   `docker-compose build`

2. **Start all services in detached mode:**
   `docker-compose up -d`

3. **Verify running containers:**
   `docker ps`

You should see containers for:

- **frontend-app (Next.js):** [http://localhost:3000](http://localhost:3000)
- **backend-api (FastAPI):** [http://localhost:8000](http://localhost:8000)
- **postgres-db, redis, qdrant**

---

## Stop and Remove

- **Stop all containers:**
  `docker-compose down`

- **Stop and remove containers, networks, and volumes:**
  `docker-compose down -v`

---

## Notes

- The frontend communicates with the backend using the Docker network: use `http://backend:8000` inside Docker.
- Update `.env` files in `/backend` for database credentials, Redis, and Qdrant configuration.
- The backend Dockerfile is reused; the frontend Dockerfile is in `/frontend/Dockerfile`.

---

## License

MIT License

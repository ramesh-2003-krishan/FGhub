# FGhub Microservices

The monolith (`backend/backend/FGhub-backend`) is split into three services behind an API gateway. All API paths and behavior are unchanged.

## Services

| Service | Port | Database | Responsibility |
|---------|------|----------|----------------|
| **identity-service** | 8081 | `fghub` (`users`) | `/api/signup`, `/api/login` |
| **media-service** | 8082 | `fghub` (`media`) | `/api/media/*`, `GET /home` |
| **recommendation-service** | 8083 | — | `/api/ai/recommend` (reads media via HTTP) |
| **api-gateway** (nginx) | 9090 | — | Single entry point for the frontend |

## Run with Docker

```bash
docker compose up --build
```

- API gateway: http://localhost:9090
- Frontend: http://localhost:3000

## Run locally (without Docker)

Start MongoDB, then each service (gateway last is optional if you call services directly):

```bash
# identity-service, media-service, recommendation-service
# Set MEDIA_SERVICE_URL=http://localhost:8082 for recommendation-service
```

Use `docker compose up` for the simplest setup.

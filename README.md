# FGhub — Film & Game Hub

FGhub is a full-stack web application for browsing, rating, and managing movies and games. It includes user signup/login, a media catalog with images, star ratings, an admin panel, and **OZzz** — a keyword-based recommendation assistant.

The backend uses a **microservice architecture** (Spring Boot) behind an nginx API gateway. The frontend is a React single-page app.

---

## Features

| Feature | Description |
|---------|-------------|
| **User auth** | Sign up and log in (username / password) |
| **Media catalog** | Browse films and games with images, descriptions, and categories |
| **Ratings** | Rate media; average rating updates automatically |
| **Admin panel** | Add, edit, and delete media (client-side admin login) |
| **OZzz AI agent** | Chat-style recommendations based on keywords in your message |
| **Store** | Browse media by category |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Axios, Create React App |
| **API gateway** | nginx |
| **Identity service** | Spring Boot 4, Java 25, MongoDB |
| **Media service** | Spring Boot 4, Java 25, MongoDB |
| **Recommendation service** | Spring Boot 4, Java 25 |
| **Database** | MongoDB 7 |
| **Deployment** | Docker Compose |

---

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  React SPA  │────▶│  API Gateway     │────▶│  identity-service   │──▶ MongoDB (users)
│  :3000      │     │  (nginx) :9090   │     ├─────────────────────┤
└─────────────┘     │                  │────▶│  media-service      │──▶ MongoDB (media)
                    │                  │     ├─────────────────────┤
                    │                  │────▶│  recommendation-svc │──▶ calls media-service
                    └──────────────────┘     └─────────────────────┘
```

| Service | Port (internal) | Public via gateway | Responsibility |
|---------|-----------------|--------------------|----------------|
| **identity-service** | 8081 | `/api/signup`, `/api/login` | User accounts |
| **media-service** | 8082 | `/api/media/*`, `/home` | Media CRUD, ratings, images |
| **recommendation-service** | 8083 | `/api/ai/recommend` | OZzz recommendations |
| **api-gateway** | 9090 | All routes above | Single entry point |
| **frontend** | 80 (mapped to 3000) | — | Static React build |
| **mongodb** | 27017 | — | Database `fghub` |

More backend details: [`backend/services/README.md`](backend/services/README.md)

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)
- **Or** for local development without Docker:
  - Java 25+
  - Maven 3.9+
  - Node.js 20+
  - MongoDB running on `localhost:27017`

---

## Quick start (Docker)

1. Clone the repository:

   ```bash
   git clone https://github.com/ramesh-2003-krishan/FGhub.git
   cd FGhub
   ```

2. Start Docker Desktop.

3. Run everything:

   ```bash
   docker compose up --build
   ```

4. Open in your browser:

   | App | URL |
   |-----|-----|
   | **Website** | http://localhost:3000 |
   | **API health** | http://localhost:9090/home |

5. Stop the stack:

   ```bash
   # Press Ctrl+C in the terminal, then:
   docker compose down
   ```

First build may take several minutes (Maven builds inside Docker for each Java service).

---

## Run locally (without Docker)

### 1. MongoDB

Start MongoDB on `mongodb://localhost:27017`. Data is stored in database **`fghub`** (collections: `users`, `media`).

### 2. Backend services

Open **three** terminals and run each service from its folder:

```bash
# Terminal 1 — Identity (port 8081)
cd backend/services/identity-service
mvn spring-boot:run

# Terminal 2 — Media (port 8082)
cd backend/services/media-service
mvn spring-boot:run

# Terminal 3 — Recommendation (port 8083)
cd backend/services/recommendation-service
mvn spring-boot:run
```

Set this for the recommendation service (PowerShell):

```powershell
$env:MEDIA_SERVICE_URL="http://localhost:8082"
```

### 3. API gateway (optional but matches production)

With Docker only for gateway + MongoDB, or run nginx from `backend/services/api-gateway` on port **9090**.

The frontend expects the API at **http://localhost:9090**.

### 4. Frontend (development)

```bash
cd frontend
npm install
npm start
```

Opens http://localhost:3000 with hot reload. Ensure the API gateway (or all services) is reachable on port **9090**.

---

## Project structure

```
FGhub/
├── docker-compose.yml          # Runs all services
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # MediaList, MediaForm, OZzzAgent, RateMedia
│   │   └── pages/              # Home, Media, Login, Signup, AdminPanel, store
│   └── Dockerfile
└── backend/
    └── services/
        ├── api-gateway/        # nginx reverse proxy (:9090)
        ├── identity-service/   # Users (:8081)
        ├── media-service/      # Media catalog (:8082)
        └── recommendation-service/  # OZzz AI (:8083)
```

---

## API reference

Base URL (via gateway): **http://localhost:9090**

| Method | Endpoint | Service | Description |
|--------|----------|---------|-------------|
| `GET` | `/home` | media | Health check message |
| `POST` | `/api/signup` | identity | Register user (JSON body: username, password, email) |
| `POST` | `/api/login` | identity | Login (returns user or `null`) |
| `GET` | `/api/media` | media | List all media |
| `POST` | `/api/media` | media | Create media (multipart: title, description, date, category, image) |
| `PUT` | `/api/media/{id}/rating?rating=` | media | Add a rating |
| `DELETE` | `/api/media/{id}` | media | Delete media |
| `POST` | `/api/media/edit/{id}` | media | Update media (multipart) |
| `POST` | `/api/ai/recommend` | recommendation | Body: `{ "message": "..." }` — returns up to 5 matches |

---

## Default access

| Role | How to sign in |
|------|----------------|
| **User** | Sign up on the site, then log in |
| **Admin** | Admin login → username: `admin`, password: `admin` (checked in the browser only) |

> Admin credentials are not enforced by the backend. For production, add server-side roles and authentication.

---

## Environment & configuration

### Docker Compose

| Service | Environment |
|---------|-------------|
| identity-service, media-service | `SPRING_PROFILES_ACTIVE=docker` → MongoDB at `mongodb://mongodb:27017/fghub` |
| recommendation-service | `MEDIA_SERVICE_URL=http://media-service:8082` |

### Spring Boot 4 (local)

MongoDB URI is set in `application.properties`:

```properties
spring.mongodb.uri=mongodb://localhost:27017/fghub
```

Docker profile (`application-docker.properties`) uses host `mongodb` instead of `localhost`.

### Frontend

API calls are hardcoded to `http://localhost:9090`. Change these in the React components if your gateway runs on another host or port.

---

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| `docker` connection failed | Start **Docker Desktop** and wait until it is running |
| Frontend loads but no data | Check API at http://localhost:9090/home and http://localhost:9090/api/media |
| Port already in use | Stop other apps on ports `3000`, `9090`, or `27017` |
| Old `fghub-backend` container | Run `docker compose down --remove-orphans` |
| Build is slow | Normal on first run; Maven downloads dependencies per service |

---

## License

This project is for educational / portfolio use. Add a license file if you publish it publicly.

---

## Repository

https://github.com/ramesh-2003-krishan/FGhub

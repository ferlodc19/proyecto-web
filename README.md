# Jobly

Plataforma de empleo con reseñas de empresas, sueldos y entrevistas, inspirada en la interfaz de Glassdoor.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React + TypeScript + Vite + Tailwind |
| Backend | ASP.NET Core Web API (.NET 10, C#) en microservicios |
| Gateway | YARP |
| Base de datos | PostgreSQL 17 (3FN) + Entity Framework Core |
| Mensajería | RabbitMQ |
| Contenedores | Docker y Docker Compose |
| CI | GitHub Actions |

## Estructura

```
jobly/
├─ backend/        Solución .NET: gateway y 5 microservicios
├─ frontend/       App React (ver frontend/README.md)
├─ database/       Scripts de inicio de PostgreSQL
├─ docs/           Arquitectura, base de datos, flujo de Git, diseño y ERD
├─ .github/        CI y plantilla de Pull Request
└─ docker-compose.yml
```

## Requisitos

Git, Docker Desktop, .NET SDK 10 y Node.js (LTS).

## Primeros pasos (PowerShell)

```powershell
git clone <URL-del-repositorio>
cd jobly
Copy-Item .env.example .env      # y cambia las claves dentro de .env
docker compose up --build        # levanta PostgreSQL, RabbitMQ, los 5 servicios y el gateway
```

Comprobar que todo responde:

| Qué | URL |
|---|---|
| Gateway | http://localhost:5000/health |
| Ejemplo vía gateway | http://localhost:5000/api/jobs/ping |
| RabbitMQ (panel) | http://localhost:15672 |

Para desarrollar un servicio sin Docker (con PostgreSQL y RabbitMQ ya levantados por Docker):

```powershell
docker compose up postgres rabbitmq -d
dotnet run --project backend/src/Services/Jobs/Jobly.Jobs.Api
dotnet run --project backend/src/Gateway/Jobly.Gateway
```

> Si cambias las claves en `.env` después de haber creado el contenedor de PostgreSQL por primera vez, ejecuta `docker compose down -v` para recrearlo.

## Documentación

- [Arquitectura](docs/arquitectura.md)
- [Reglas de base de datos](docs/base-de-datos.md)
- [Flujo de trabajo con Git](docs/flujo-de-trabajo.md)
- [Diseño](docs/design/README.md)

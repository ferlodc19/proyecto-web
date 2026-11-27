# Jobly

Jobly es un prototipo de plataforma de empleo inspirado en Glassdoor. Reúne una interfaz para explorar vacantes y empresas, y una arquitectura backend preparada para crecer hacia reseñas, sueldos, entrevistas y candidaturas.

> **Estado:** la interfaz usa datos de muestra. Los servicios backend y el gateway tienen endpoints básicos de salud y prueba; todavía no implementan persistencia, autenticación ni las funciones completas del producto.

## Funcionalidades actuales

- Inicio y exploración de empleos, con datos de muestra.
- Guardado de vacantes en el navegador.
- Listado de empresas y páginas de perfil.
- Pantalla de acceso en desarrollo.
- Secciones de reseñas, entrevistas y sueldos marcadas como próximas.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS y React Router |
| Backend | ASP.NET Core Web API con .NET 10 y C# |
| Gateway | YARP (reverse proxy) |
| Persistencia prevista | PostgreSQL 17 y Entity Framework Core |
| Mensajería prevista | RabbitMQ |
| Contenedores | Docker y Docker Compose |
| CI | GitHub Actions |

## Estructura

```text
proyecto-web/
├── backend/        Gateway y cinco servicios .NET
├── frontend/       Aplicación React y TypeScript
├── database/       Scripts de inicialización de PostgreSQL
├── docs/           Arquitectura, datos, Git y diseño
├── .github/        CI y plantilla de Pull Request
└── docker-compose.yml
```

Los servicios previstos son Identity, Companies, Jobs, Reviews y Salaries. Cada uno tiene una ruta propia en el gateway bajo `/api/`.

## Requisitos

- Node.js LTS y npm para el frontend.
- Docker Desktop con Docker Compose para levantar el entorno completo.
- .NET SDK 10 si vas a ejecutar servicios directamente en tu equipo.

## Ejecutar el frontend

Desde PowerShell, en la raíz del proyecto:

```powershell
cd frontend
npm ci
npm run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:5173`. Esta versión presenta datos de muestra y no necesita el backend para explorar las pantallas implementadas.

## Ejecutar backend e infraestructura con Docker

Desde la raíz del proyecto:

```powershell
Copy-Item .env.example .env
```

Edita `.env` y define contraseñas propias antes de levantar los servicios. Después:

```powershell
docker compose up --build
```

El Compose inicia PostgreSQL, RabbitMQ, los cinco servicios, el gateway y sus dependencias. Las comprobaciones disponibles son:

| Servicio | Dirección |
|---|---|
| Salud del gateway | http://localhost:5000/health |
| Prueba del servicio Jobs a través del gateway | http://localhost:5000/api/jobs/ping |
| Panel de RabbitMQ | http://localhost:15672 |

El frontend en contenedor es opcional y se activa con el perfil `web`:

```powershell
docker compose --profile web up --build
```

Luego abre http://localhost:3000. El frontend de contenedor aún muestra datos de muestra.

## Desarrollo del backend sin contenedores de aplicación

Puedes dejar PostgreSQL y RabbitMQ en Docker y ejecutar Jobs y el gateway con .NET:

```powershell
docker compose up postgres rabbitmq -d
dotnet run --project backend/src/Services/Jobs/Jobly.Jobs.Api
dotnet run --project backend/src/Gateway/Jobly.Gateway
```

Los servicios restantes se pueden ejecutar con `dotnet run` usando sus proyectos en `backend/src/Services/`. Sus endpoints actuales son principalmente `/health` y `/api/<servicio>/ping`.

> Si cambias las credenciales de PostgreSQL después de inicializar su volumen, Docker conservará los datos y la configuración anterior. `docker compose down -v` elimina ese volumen junto con sus datos; úsalo solo si quieres reiniciar la base desde cero.

## Estado del backend

- El gateway enruta `/api/identity`, `/api/companies`, `/api/jobs`, `/api/reviews` y `/api/salaries` a sus servicios.
- Los servicios ofrecen endpoints de salud y ping.
- La conexión real a PostgreSQL, los modelos/migraciones de EF Core, JWT, RabbitMQ y las operaciones del producto están pendientes.
- El frontend todavía no consume el gateway.

## Documentación

- [Arquitectura](docs/arquitectura.md)
- [Reglas de base de datos](docs/base-de-datos.md)
- [Flujo de trabajo con Git](docs/flujo-de-trabajo.md)
- [Diseño de interfaz](docs/design/README.md)
- [Base de datos](database/README.md)

# Arquitectura

```
Navegador (React) ──► API Gateway (YARP :5000) ──► Identity   :5101
                                                ├─► Companies  :5102
                                                ├─► Jobs       :5103
                                                ├─► Reviews    :5104
                                                └─► Salaries   :5105
                          PostgreSQL (una BD por servicio) · RabbitMQ (eventos)
```

| Servicio | Responsabilidad | Ruta por el gateway | Base de datos |
|---|---|---|---|
| Identity | registro, login, perfil, habilidades | `/api/identity` | `jobly_identity` |
| Companies | perfil de empresa, sector, ubicación, seguidores | `/api/companies` | `jobly_companies` |
| Jobs | vacantes, búsqueda, guardadas, candidaturas | `/api/jobs` | `jobly_jobs` |
| Reviews | reseñas, calificaciones, votos, entrevistas | `/api/reviews` | `jobly_reviews` |
| Salaries | sueldos reportados y estimaciones | `/api/salaries` | `jobly_salaries` |

## Reglas

- El frontend solo llama al gateway.
- Un servicio **nunca** lee la base de datos de otro. Si necesita datos ajenos, usa su API REST o guarda solo el ID (`empresa_id`).
- Cambios que deben propagarse en segundo plano (p. ej. reseña publicada → recalcular calificación de la empresa) se envían como eventos por RabbitMQ (carpeta `Events/` de cada servicio).
- Cada servicio valida el JWT emitido por Identity.
- Comprobación de salud: `GET /health` en cada servicio.

## Estructura interna de cada servicio

`Domain/` entidades · `Data/` DbContext y migraciones · `Endpoints/` rutas de la API · `Events/` publicación y consumo de eventos.

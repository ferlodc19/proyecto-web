# Base de datos

- Motor: PostgreSQL 17. Cada microservicio tiene **su propia base de datos** (se crean en `init/01-create-databases.sql`).
- Las tablas se crean con **migraciones de Entity Framework Core** dentro de cada servicio (`Data/Migrations`).
- El diagrama entidad-relación en 3FN va en `docs/erd/` (exportado en PNG y en el formato fuente).
- Reglas de 3FN y de diseño: ver `docs/base-de-datos.md`.

# Flujo de trabajo con Git

- `main`: siempre estable (es lo que se despliega). Protegida: solo se cambia con Pull Request.
- `develop`: integración del equipo.
- Ramas de trabajo desde `develop`: `feature/<área>-<descripción>`, `fix/<descripción>`, `docs/<descripción>`.
  Ejemplos: `feature/jobs-listado`, `feature/front-navbar`.
- Commits cortos y en presente: `feat(jobs): agrega búsqueda por modalidad`, `fix(front): corrige filtro`, `docs: actualiza README`.
- Pull Request a `develop` con al menos **1 revisión** y el CI en verde.
- Antes de empezar a trabajar: `git pull` en `develop` y crea tu rama desde ahí.
- Nunca subas `.env`, claves ni contraseñas.

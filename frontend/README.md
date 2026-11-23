# Frontend (React + TypeScript + Vite + Tailwind)

Esta carpeta está lista para crear la app. **Una sola persona** del equipo debe hacerlo y subirlo, para evitar conflictos.

## 1. Crear la app (PowerShell, dentro de `frontend`)

```powershell
npm create vite@latest . -- --template react-ts
```

Si pregunta que la carpeta no está vacía, elige **Ignore files and continue**.

```powershell
npm install
npm install react-router-dom @tanstack/react-query lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

## 2. Configurar

- Tailwind: colores, tipografía, radios y sombras salen de la sección 10 del *Manual de interfaz* (`docs/design/`).
- Fuentes: Inter y Manrope.
- Variables de entorno: copia `.env.example` como `.env.local`.

## 3. Estructura sugerida de `src/`

```
src/
  app/          rutas, layout, proveedores
  pages/        Inicio, Empleos, Empresa, Sueldos, Entrevistas, Acceso
  features/     jobs, companies, reviews, salaries, auth (componentes + hooks + llamadas a la API)
  components/   botones, chips, tarjetas, buscador… (los del manual)
  lib/          cliente HTTP, utilidades
  styles/       estilos globales
```

## 4. Ejecutar

```powershell
npm run dev    # http://localhost:5173
```

La app habla solo con el gateway (`VITE_API_URL`), nunca directo con los microservicios.

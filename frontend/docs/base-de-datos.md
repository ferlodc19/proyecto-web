# Reglas de base de datos (3FN)

- Catálogos en tablas propias (Sector, Estado, Ciudad, Modalidad, Habilidad), sin texto repetido.
- Relaciones muchos a muchos con tabla intermedia (VacanteHabilidad, UsuarioHabilidad, VacanteGuardada).
- Calificaciones por categoría como filas: `ReseñaCalificacion(reseña_id, categoria_id, valor)`.
- No guardar datos calculados (promedios). Si se hace por rendimiento, documentarlo como desnormalización intencional.
- Entre servicios solo se guarda el ID de la entidad externa, sin llaves foráneas entre bases de datos.
- Nombres: tablas en singular y PascalCase; llaves `Id`; llaves foráneas `<Entidad>Id`.
- Todo cambio de esquema pasa por una migración de EF Core, nunca por edición manual.

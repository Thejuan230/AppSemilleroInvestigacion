# Casos de uso especifico: Registrar estado diario

- Actor: Usuario autenticado.
- Precondicion: Sesion activa.
- Flujo principal:
  1. Usuario ingresa fecha, estado emocional, riesgo y dias.
  2. Sistema valida rangos y datos obligatorios.
  3. Sistema guarda registro.
  4. Sistema actualiza resumen en dashboard.
- Postcondicion: Registro diario persistido en BD.

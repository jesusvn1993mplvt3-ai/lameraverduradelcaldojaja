# MAES26 - Control y Planeación (Vite + React refactor)

Esta entrega corresponde a la **Opción B - Conversión profesional**.
He separado la app en un proyecto Vite + React + Tailwind minimal funcional.

## Qué incluye
- Estructura `src/` con componentes básicos:
  - `Login`, `OrderManager`
- `firebase/init.js` que carga configuración desde `import.meta.env` (.env)
- `utils/calc.js` con funciones de calendario y cálculo de consumos (abridged)
- Tailwind configurado (tailwind.config.cjs, postcss.config.cjs)
- Scripts en `package.json` para dev/build/preview

## Cómo correr
1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env` y llena las variables VITE_FIREBASE_*
3. Corre `npm run dev`
4. Abre el sitio en `http://localhost:5173`

## Notas
- La lógica original era extensa (un único HTML). Aquí extraje la estructura y funciones principales.
- Si quieres que siga y **refactorice cada componente** (ReportModal, UserManagement, Visibility, Calendar, ProductionSlot),
  lo hago en la siguiente iteración. Esta entrega te da la base para seguir con los componentes ya modularizados.

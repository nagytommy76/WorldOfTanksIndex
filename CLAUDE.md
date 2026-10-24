# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

World of Tanks vehicle encyclopedia built with Next.js 15 (App Router, Turbopack), React 19, TypeScript, MongoDB/Mongoose, MUI 7 + Tailwind 4, TanStack Query. Vehicle data is extracted from the game client's XML (`res/packages/scripts.pkg/scripts/item_defs/vehicles/`), converted to JSON and stored in MongoDB. The extraction pipeline is **not** part of this repo; this app only reads the resulting documents.

## Context Files

Read the following to get the full context of the project:

- @Context/data-flow.md
- @Context/vehicle-details.md
- @Context/ai-interactions.md
- @Context/coding-standards.md

## Commands

```bash
npm run dev            # next dev --turbopack (http://localhost:3000)
npm run build
npm run lint           # next lint (next/core-web-vitals + next/typescript)
npm test               # jest (jsdom, ts-jest, via next/jest)
npm run test:coverage

npx jest __tests__/VehicleDetails/Mechanics/Taschenratte.test.tsx   # single file
npx jest -t "should render secondary weapon"                         # single test by name
```

Env vars (`.env`): `NEXT_PUBLIC_MONGO_CONNECTION_STRING`, `NEXT_PUBLIC_APP_URL`, `WOT_APP_ID` / `NEXT_PUBLIC_WOT_APP_ID`.

## Architecture

### Routes

- `/vehicles/{techtree|premium|collectors|other}/[nation]` lists vehicles (filterable table under `src/components/VehiclesTable`, ordering in `OrderContext`).
- `/[tank_id]/[tank_name]` (plus `/modules`, `/mastery`, `/gunmarks`) is the vehicle detail page. `tank_name` is the vehicle's `xmlId`. The API treats `tank_id === 'null'` as "look up by `xmlId` only".

## Conventions

- Formatting: 3-space indent, single quotes, no semicolons, JSX single-quoted attributes.
- Path aliases are defined in `tsconfig.json` and used heavily (`@/VehicleContext/*`, `@/DevicesContext/*`, `@/CrewContext/*`, `@/DetailsTable/*`, `@/Mechanics/*`, `@/utils/*`, `@Models/*`, `@VehicleTypes/*`, …). `@/*` maps to the repo root, so `@/src/...`, `@/types/...` and `@/__tests__/...` also resolve. Two aliases have **no slash**, so imports concatenate directly: `@/components*` → `@/componentsVehiclesTable/VehiclesTable`, and `@/Providers*` → `@/ProvidersThemeProvider`.
- Shared domain types live in the top-level `types/` folder (not `src/`).

## Testing

- Tests live in `__tests__/` and mirror the feature layout. Fixture tank documents are in `__tests__/mocks/` (e.g. `Taschenratte.ts`) and are passed directly to `VehicleContextProvider`.
- `dbConnect()` returns early when `NODE_ENV === 'test'`. DB tests use `mongodb-memory-server` through the helpers in `__tests__/lib/db.ts` (`startMongoMemoryServer`, `clearDatabase`, `stopMongoMemoryServer`).
- Components that render table rows need a `<table><tbody>` wrapper in tests.

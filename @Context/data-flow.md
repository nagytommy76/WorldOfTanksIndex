### Data flow

- **API routes** in `app/api/**/route.ts` call `dbConnect()` (`src/lib/ConnectDB.ts`) and query Mongoose models in `src/models/` (`TankModel`, `DevicesModel`, `CrewSkillModel`).
- **Server components fetch their own API routes over HTTP** using `NEXT_PUBLIC_APP_URL` (falling back to `http://localhost:3000`), e.g. `src/lib/getVehicles.ts` and `app/[tank_id]/[tank_name]/modules/page.tsx`. The dev server must be running for these pages to render.
- Client-side data (devices, battle boosters, crew skills, search) goes through TanStack Query hooks using the axios instance in `src/Providers/AxiosProvider.tsx`, whose `baseURL` is hard-coded to `http://localhost:3000/api`.
- Mastery and Marks of Excellence data come from the external poliroid.me API (`src/lib/getPoliroid.ts`).

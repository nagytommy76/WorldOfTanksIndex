### Vehicle details: context stack and stat pipeline

`modules/page.tsx` nests three client contexts, and the order matters because each reads the one above it:

1. `VehicleContext` (`src/components/VehicleDetails/Context/`) holds the selected modules (gun/turret/engine/chassis/radio/shells) via `VehicleReducer`, plus `ModifiersReducer` for shell modifiers. The `useSet*` hooks in `Context/Hooks/` seed it from `ITankData`. It renders a loading placeholder until `isVehicleReady`.
2. `DeviceContext` holds equipped devices and battle boosters (`appliedDevicesModifiers`, `appliedBattleBoosterModifiers`).
3. `CrewContext` builds `Commander`/`CrewMember` class instances (`CrewContext/Classes/`) from `tankDetails.crew`. It also listens to DeviceContext, so Improved Ventilation feeds into crew efficiency.

Every displayed stat in `Modules/DetailsTable/*` (Firepower, Mobility, Spotting, Concealment, Survivability…) follows the same pattern: build a flat `{ statName: baseNumber }` object, then run it through `applyStatPipeline` (`src/utils/applyStatPipeline.ts`) with an ordered list of transformers inside `useMemo`:

```ts
applyStatPipeline(base, [
   createDeviceTransformer(appliedDevicesModifiers), // src/utils/ApplyModifiers.ts
   createDeviceBoostersTransformer(appliedBattleBoosterModifiers), // src/utils/ApplyDeviceBooster.ts
   createCrewTransformer(commander, crewMembers, isCalculateSituational), // src/utils/ApplyCrewModifiers.ts
   createCrewSkillsTransformer(commander, crewMembers), // src/utils/ApplyCrewSkillModifier.ts
])
```

Devices must run before crew so that the crew formula applies on top of device-adjusted values. Transformers only touch fields that are present in the base object.

- `src/utils/modifierConfig.ts` maps a game modifier name (from the XML/DB) to the stat fields it affects and its operation (`mul`, `add`, `mulAdd`, `mulSubtract`). To support a new device modifier, add an entry here and make sure the consuming table passes a matching field name.
- `src/utils/crewModifierConfig.ts` / `crewSkillConfig.ts` do the same for crew roles and skills. Crew stats use WoT's degressive formula `nominal * 0.875 / (0.00375 * efficiency + 0.5)` and a progressive formula `nominal * (0.57 + 0.43 * efficiency/100)`.
- **Crew state is mutable class instances.** `CrewReducer` mutates `Commander`/`CrewMember` objects in place and then returns a shallow-copied state (`{ ...state, crewMembers: { ...crewMembers } }`) to trigger re-renders. Keep that copy when adding actions, and include `commander`/`crewMembers`/related flags in the consuming `useMemo` deps.

### Tier XI / special mechanics

`Modules/DetailsTable/Mechanics/Mechanics.tsx` dispatches on the vehicle (via `src/helpers/tierXITanks.ts`) to a per-vehicle component under `Mechanics/Includes/<nation>/` (e.g. `germany/Taschenratte.tsx`), with types in `Mechanics/Types`. Adding a new special vehicle means adding its type, component, import and branch there.

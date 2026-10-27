import type { FieldModificationTreeInput } from '@Models/FieldModifications/TreeTypes'
import type { BaseModificationInput, PairModificationInput } from '@Models/FieldModifications/FieldModificationTypes'
import type { ITierPrice } from '@Models/FieldModifications/price.types'

/**
 * 1 (feature) ─► 2 (base) ─► 3 (pair, tier 8-10) ─► 4 (base, tier 9-10)
 *                       └──────────────────────────► 4
 */
export const MockFieldModificationTree: FieldModificationTreeInput = {
   role: 'role_LT_universal',
   xmlId: 1,
   rootStep: 1,
   steps: [
      {
         id: 1,
         level: 1,
         price: 'unlockBaseModificationCost',
         action: { type: 'feature', value: 'opt_dev_boosters_switch' },
         unlocks: [2],
         tierRange: null,
      },
      {
         id: 2,
         level: 2,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_universal_base_1' },
         unlocks: [3, 4],
         tierRange: null,
      },
      {
         id: 3,
         level: 6,
         price: 'unlockPairModificationCost',
         action: { type: 'pair_modification', value: 'role_lightTank_pair_1' },
         unlocks: [4],
         tierRange: { min: 8, max: 10 },
      },
      {
         id: 4,
         level: 7,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_universal_base_2' },
         unlocks: [],
         tierRange: { min: 9, max: 10 },
      },
   ],
}

export const MockBaseModifications: BaseModificationInput[] = [
   {
      key: 'role_LT_universal_base_1',
      xmlId: 101,
      locName: 'gun_balancing_1',
      modifiers: [{ operation: 'mul', name: 'miscAttrs/gunAimingTimeFactor', value: 0.97 }],
      kpi: [{ operation: 'mul', name: 'vehicleGunAimSpeed', value: 1.03 }],
   },
   {
      key: 'role_LT_universal_base_2',
      xmlId: 102,
      locName: 'hull_traverse_1',
      modifiers: [{ operation: 'mul', name: 'miscAttrs/chassisRotationSpeedFactor', value: 1.02 }],
      kpi: [{ operation: 'mul', name: 'vehicleAllGroundRotationSpeed', value: 1.02 }],
   },
]

export const MockPairModification: PairModificationInput = {
   key: 'role_lightTank_pair_1',
   options: [
      {
         xmlId: 201,
         imgName: 'improvedEnginePower',
         displayName: 'Improved Engine Power',
         modifiers: [{ operation: 'mul', name: 'miscAttrs/enginePowerFactor', value: 1.03 }],
         kpi: [{ operation: 'mul', name: 'vehicleEnginePower', value: 1.03 }],
      },
      {
         xmlId: 202,
         imgName: 'additionalGrousers',
         displayName: 'Additional Grousers',
         modifiers: [{ operation: 'mul', name: 'miscAttrs/enginePowerFactor', value: 0.97 }],
         kpi: [{ operation: 'mul', name: 'vehicleEnginePower', value: 0.97 }],
      },
   ],
}

export const MockFieldModificationPrices: { key: string; prices: ITierPrice[] }[] = [
   {
      key: 'unlockBaseModificationCost',
      prices: [
         { tier: 8, amount: 12000, currency: 'xp' },
         { tier: 9, amount: 20000, currency: 'xp' },
         { tier: 10, amount: 28000, currency: 'xp' },
      ],
   },
   {
      key: 'unlockPairModificationCost',
      prices: [
         { tier: 8, amount: 0, currency: 'credits' },
         { tier: 9, amount: 0, currency: 'credits' },
         { tier: 10, amount: 0, currency: 'credits' },
      ],
   },
]

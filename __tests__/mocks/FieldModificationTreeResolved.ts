import type { IResolvedFieldModificationTree } from '@Models/FieldModifications/TreeTypes'

/**
 * Real tier 10 role_LT_scout tree from GET /api/field_modifications (without _id and __v)
 *
 * I feature ─► II base + pair ─► III feature ─► IV base + pair ─► V base + pair ─► VI role slot ─► VII base + pair ─► VIII base + pair
 *
 * The modification interfaces extend Document, so the plain object needs a cast
 */
export const MockResolvedScoutTree = {
   role: 'role_LT_scout',
   xmlId: 4306,
   rootStep: 1,
   steps: [
      {
         id: 1,
         level: 1,
         price: 'unlockBaseModificationCost',
         action: { type: 'feature', value: 'shells_consumables_switch' },
         unlocks: [2],
         tierRange: null,
         modification: null,
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 2,
         level: 2,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_scout_base_1' },
         unlocks: [3, 401],
         tierRange: null,
         modification: {
            key: 'role_LT_scout_base_1',
            kind: 'base',
            xmlId: 431,
            locName: 'clutches_replace_1',
            modifiers: [
               { operation: 'mul', name: 'miscAttrs/onStillRotationSpeedFactor', value: 1.02 },
               { operation: 'mul', name: 'miscAttrs/onMoveRotationSpeedFactor', value: 1.02 },
               { operation: 'mul', name: 'miscAttrs/centerRotationFwdSpeedFactor', value: 1.02 },
            ],
            kpi: [{ operation: 'mul', name: 'vehicleAllGroundRotationSpeed', value: 1.02 }],
         },
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 401,
         level: 2,
         price: 'unlockPairModificationCost',
         action: { type: 'pair_modification', value: 'role_lightTank_pair_1' },
         unlocks: [],
         tierRange: null,
         modification: {
            key: 'role_lightTank_pair_1',
            kind: 'pair',
            options: [
               {
                  xmlId: 4011,
                  imgName: 'improvedEnginePower',
                  displayName: 'Valves Tuning (Setup 1)',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/enginePowerFactor', value: 1.03 },
                     { operation: 'add', name: 'miscAttrs/forwardMaxSpeedKMHTerm', value: -2 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleEnginePower', value: 1.03 },
                     { operation: 'add', name: 'vehicleForwardMaxSpeed', value: -2 },
                  ],
               },
               {
                  xmlId: 4012,
                  imgName: 'improvedSpeedIndicator',
                  displayName: 'Valves Tuning (Setup 2)',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/enginePowerFactor', value: 0.97 },
                     { operation: 'add', name: 'miscAttrs/forwardMaxSpeedKMHTerm', value: 2 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleEnginePower', value: 0.97 },
                     { operation: 'add', name: 'vehicleForwardMaxSpeed', value: 2 },
                  ],
               },
            ],
         },
         cost: { amount: 0, currency: 'xp' },
      },
      {
         id: 3,
         level: 3,
         price: 'unlockBaseModificationCost',
         action: { type: 'feature', value: 'opt_dev_boosters_switch' },
         unlocks: [4],
         tierRange: null,
         modification: null,
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 4,
         level: 4,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_scout_base_2' },
         unlocks: [5, 402],
         tierRange: null,
         modification: {
            key: 'role_LT_scout_base_2',
            kind: 'base',
            xmlId: 432,
            locName: 'improved_suspension_1',
            modifiers: [
               { operation: 'mul', name: 'miscAttrs/chassis/shotDispersionFactors/movement', value: 0.99 },
            ],
            kpi: [{ operation: 'mul', name: 'vehicleGunShotDispersionChassisMovement', value: 0.99 }],
         },
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 402,
         level: 4,
         price: 'unlockPairModificationCost',
         action: { type: 'pair_modification', value: 'role_lightTank_pair_2' },
         unlocks: [],
         tierRange: null,
         modification: {
            key: 'role_lightTank_pair_2',
            kind: 'pair',
            options: [
               {
                  xmlId: 4021,
                  imgName: 'improvedGunBreech',
                  displayName: 'Loading Mechanism Tuning',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/gunReloadTimeFactor', value: 0.97 },
                     { operation: 'mul', name: 'miscAttrs/multShotDispersionFactor', value: 1.03 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleGunReloadTime', value: 0.97 },
                     { operation: 'mul', name: 'vehicleGunShotFullDispersion', value: 1.03 },
                  ],
               },
               {
                  xmlId: 4022,
                  imgName: 'improvedScope',
                  displayName: 'Aiming Mechanism Tuning',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/multShotDispersionFactor', value: 0.97 },
                     { operation: 'mul', name: 'miscAttrs/gunReloadTimeFactor', value: 1.03 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleGunShotFullDispersion', value: 0.97 },
                     { operation: 'mul', name: 'vehicleGunReloadTime', value: 1.03 },
                  ],
               },
            ],
         },
         cost: { amount: 0, currency: 'xp' },
      },
      {
         id: 5,
         level: 5,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_scout_base_3' },
         unlocks: [6, 403],
         tierRange: null,
         modification: {
            key: 'role_LT_scout_base_3',
            kind: 'base',
            xmlId: 433,
            locName: 'suspension_elements_replace_2',
            modifiers: [{ operation: 'mul', name: 'miscAttrs/chassisHealthFactor', value: 1.15 }],
            kpi: [{ operation: 'mul', name: 'vehicleChassisStrength', value: 1.15 }],
         },
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 403,
         level: 5,
         price: 'unlockPairModificationCost',
         action: { type: 'pair_modification', value: 'role_lightTank_pair_3' },
         unlocks: [],
         tierRange: null,
         modification: {
            key: 'role_lightTank_pair_3',
            kind: 'pair',
            options: [
               {
                  xmlId: 4031,
                  imgName: 'improvedSpallingResistance',
                  displayName: 'Reinforced Spalling Protection',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/antifragmentationLiningFactor', value: 1.15 },
                     { operation: 'mul', name: 'miscAttrs/crewChanceToHitFactor', value: 0.8 },
                     { operation: 'add', name: 'miscAttrs/stunResistanceDuration', value: 0.08 },
                     { operation: 'add', name: 'miscAttrs/backwardMaxSpeedKMHTerm', value: -3 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleHEShellDamageResistance', value: 0.85 },
                     { operation: 'mul', name: 'vehicleRamDamageResistance', value: 0.85 },
                     { operation: 'mul', name: 'crewStunDuration', value: 0.92 },
                     { operation: 'mul', name: 'crewHitChance', value: 1.2 },
                     { operation: 'add', name: 'vehicleBackwardMaxSpeed', value: -3 },
                  ],
               },
               {
                  xmlId: 4032,
                  imgName: 'improvedSpeedIndicatorBackwards',
                  displayName: 'Lightweight Spalling Protection',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/antifragmentationLiningFactor', value: 0.85 },
                     { operation: 'mul', name: 'miscAttrs/crewChanceToHitFactor', value: 1.2 },
                     { operation: 'add', name: 'miscAttrs/backwardMaxSpeedKMHTerm', value: 3 },
                     { operation: 'add', name: 'miscAttrs/stunResistanceDuration', value: -0.08 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleHEShellDamageResistance', value: 1.15 },
                     { operation: 'mul', name: 'vehicleRamDamageResistance', value: 1.15 },
                     { operation: 'mul', name: 'crewStunDuration', value: 1.08 },
                     { operation: 'mul', name: 'crewHitChance', value: 0.8 },
                     { operation: 'add', name: 'vehicleBackwardMaxSpeed', value: 3 },
                  ],
               },
            ],
         },
         cost: { amount: 0, currency: 'xp' },
      },
      {
         id: 6,
         level: 6,
         price: 'unlockBaseModificationCost',
         action: { type: 'feature', value: 'roleSlot' },
         unlocks: [7],
         tierRange: { min: 8, max: 10 },
         modification: null,
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 7,
         level: 7,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_scout_base_4' },
         unlocks: [8, 434],
         tierRange: { min: 9, max: 10 },
         modification: {
            key: 'role_LT_scout_base_4',
            kind: 'base',
            xmlId: 434,
            locName: 'muzzle_flash_suppressor_1',
            modifiers: [{ operation: 'mul', name: 'miscAttrs/invisibilityFactorAtShot', value: 1.025 }],
            kpi: [{ operation: 'mul', name: 'vehicleInvisibilityAfterShot', value: 1.025 }],
         },
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 434,
         level: 7,
         price: 'unlockPairModificationCost',
         action: { type: 'pair_modification', value: 'role_LT_scout_pair_4' },
         unlocks: [],
         tierRange: { min: 9, max: 10 },
         modification: {
            key: 'role_LT_scout_pair_4',
            kind: 'pair',
            options: [
               {
                  xmlId: 4341,
                  imgName: 'improvedLightFilters',
                  displayName: 'Anti-Reflective Headlights Coating',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/circularVisionRadiusBaseFactor', value: 0.98 },
                     { operation: 'add', name: 'miscAttrs/invisibilityBaseAdditive', value: 0.02 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleCamouflage', value: 1.02 },
                     { operation: 'mul', name: 'vehicleCircularVisionRadius', value: 0.98 },
                  ],
               },
               {
                  xmlId: 4342,
                  imgName: 'improvedObservationDevice',
                  displayName: 'Periscope Electric Drive',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/circularVisionRadiusBaseFactor', value: 1.02 },
                     { operation: 'add', name: 'miscAttrs/invisibilityBaseAdditive', value: -0.02 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'vehicleCircularVisionRadius', value: 1.02 },
                     { operation: 'mul', name: 'vehicleCamouflage', value: 0.98 },
                  ],
               },
            ],
         },
         cost: { amount: 0, currency: 'xp' },
      },
      {
         id: 8,
         level: 8,
         price: 'unlockBaseModificationCost',
         action: { type: 'modification', value: 'role_LT_scout_base_5' },
         unlocks: [435],
         tierRange: { min: 10, max: 10 },
         modification: {
            key: 'role_LT_scout_base_5',
            kind: 'base',
            xmlId: 435,
            locName: 'torsion_bars_replace_1',
            modifiers: [{ operation: 'mul', name: 'miscAttrs/rollingFrictionFactor', value: 0.971 }],
            kpi: [{ operation: 'mul', name: 'vehicleSpeedGain', value: 1.03 }],
         },
         cost: { amount: 28000, currency: 'xp' },
      },
      {
         id: 435,
         level: 8,
         price: 'unlockPairModificationCost',
         action: { type: 'pair_modification', value: 'role_LT_scout_pair_5' },
         unlocks: [],
         tierRange: { min: 10, max: 10 },
         modification: {
            key: 'role_LT_scout_pair_5',
            kind: 'pair',
            options: [
               {
                  xmlId: 4351,
                  imgName: 'improvedReflexScopes',
                  displayName: 'Panoramic Triplex',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/demaskMovingFactor', value: 0.97 },
                     { operation: 'mul', name: 'miscAttrs/demaskFoliageFactor', value: 1.03 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'demaskMovingFactor', value: 0.97 },
                     { operation: 'mul', name: 'demaskFoliageFactor', value: 1.03 },
                  ],
               },
               {
                  xmlId: 4352,
                  imgName: 'improvedSharpnessVisor',
                  displayName: 'Narrow-Angle Observation Device',
                  modifiers: [
                     { operation: 'mul', name: 'miscAttrs/demaskFoliageFactor', value: 0.97 },
                     { operation: 'mul', name: 'miscAttrs/demaskMovingFactor', value: 1.03 },
                  ],
                  kpi: [
                     { operation: 'mul', name: 'demaskFoliageFactor', value: 0.97 },
                     { operation: 'mul', name: 'demaskMovingFactor', value: 1.03 },
                  ],
               },
            ],
         },
         cost: { amount: 0, currency: 'xp' },
      },
   ],
} as unknown as IResolvedFieldModificationTree

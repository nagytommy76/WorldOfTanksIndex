import ReturnPercentValue from '@/helpers/returnPercentValue'
import MODIFIER_CONFIG from './modifierConfig'

import type { StatTransformer } from './applyStatPipeline'
import type { BattleBoosterModifiers } from '@/DevicesContext/Types'

/**
 * Applies all active device modifiers to a flat object of vehicle stats.
 *
 * @param baseValues  - Flat object of stat field names → base numbers.
 *                      Only fields present here will be modified.
 * @param appliedBattleBoosterModifiers - From DeviceContext. Null = no devices equipped
 * @returns           A new object with the same shape, values modified where applicable.
 *
 * @example
 * // Dispersion usage:
    applyStatPipeline(
    {
        camouflageStill: vehicleStillCamoflageBase,
        camouflageMoving: vehicleMovingCamoflageBase,
        camouflageStillFire: vehicleStillCamoflageAfterFireBase,
        camouflageMovingFire: vehicleMovingCamoflageAfterFireBase,
    },
    [
        createConcealmentSkillTransformer(commander),
        createDeviceTransformer(appliedDevicesModifiers),
        createDeviceBoostersTransformer(appliedBattleBoosterModifiers),
    ],
),
*/
export function createDeviceBoostersTransformer<T extends Record<string, number>>(
   appliedBattleBoosterModifiers: BattleBoosterModifiers | null,
): StatTransformer<T> {
   // No devices equipped — return the values unchanged
   if (!appliedBattleBoosterModifiers || Object.keys(appliedBattleBoosterModifiers).length === 0) {
      return (values) => values
   }

   return (baseValues: T): T => {
      const result = { ...baseValues }

      for (const boosterModifiers of Object.values(appliedBattleBoosterModifiers)) {
         for (const modifier of boosterModifiers) {
            const config = MODIFIER_CONFIG[modifier.name]
            if (!config) continue

            for (const configField of config.fields) {
               if (!(configField in result)) continue

               const key = configField as keyof T

               switch (config.operation) {
                  case 'mul':
                     ;(result[key] as number) *= modifier.value
                     break
                  case 'mulAdd':
                     const percentValue = ReturnPercentValue(modifier.value)
                     ;(result[key] as number) += percentValue
                     break
                  case 'mulSubtract':
                     const percentValue2 = 1 - (modifier.value - 1)
                     ;(result[key] as number) *= percentValue2
                     break
                  default:
                     ;(result[key] as number) += modifier.value
                     break
               }
            }
         }
      }

      return result
   }
}

import ReturnPercentValue from '@/helpers/returnPercentValue'
import MODIFIER_CONFIG from './modifierConfig'

import type { StatTransformer } from './applyStatPipeline'
import type { DeviceModifiers } from '@/DevicesContext/Types'
// ---------------------------------------------------------------------------
// Generic apply function
// ---------------------------------------------------------------------------

/**
 * Applies all active device modifiers to a flat object of vehicle stats.
 *
 * @param baseValues  - Flat object of stat field names → base numbers.
 *                      Only fields present here will be modified.
 * @param appliedDevicesModifiers - From DeviceContext. Null = no devices equipped
 * @returns           A new object with the same shape, values modified where applicable.
 *
 * @example
 * // Dispersion usage:
 * const result = applyModifiers(
 *    { vehicleMovement: 0.06, vehicleRotation: 0.06, turretRotation: 0.05, afterShot: 3.5 },
 *    appliedDevicesModifiers
 * )
 *
 * @example
 * // Mobility usage:
 * const result = applyModifiers(
 *    { forwardSpeed: 72, backwardSpeed: 25, traverseSpeed: 56 },
 *    appliedDevicesModifiers
 * )
 */
export default function applyModifiersOnVehicleDetails<T extends Record<string, number>>(
   baseValues: T,
   appliedDevicesModifiers: DeviceModifiers | null,
): T {
   // No devices equipped or empty — return base values unchanged
   if (!appliedDevicesModifiers || Object.keys(appliedDevicesModifiers).length === 0) {
      return baseValues
   }

   // Shallow copy so we never mutate the original base values
   const result = { ...baseValues }

   // Iterate over each equipped device's modifier list
   for (const deviceModifiers of Object.values(appliedDevicesModifiers)) {
      for (const modifier of deviceModifiers) {
         // vehicleGunShotDispersion, vehicleAllGroundRotationSpeed
         const config = MODIFIER_CONFIG[modifier.name]

         // Skip modifiers we don't have a config for yet
         if (!config) continue

         for (const configField of config.fields) {
            // Only apply if this field was actually passed in by the caller
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
/**
 * Returns a StatTransformer that applies all equipped device modifiers.
 * Returns an identity transformer (no-op) when no devices are equipped.
 */
export function createDeviceTransformer<T extends Record<string, number>>(
   appliedDevicesModifiers: DeviceModifiers | null,
): StatTransformer<T> {
   // No devices equipped — return the values unchanged
   if (!appliedDevicesModifiers || Object.keys(appliedDevicesModifiers).length === 0) {
      return (values) => values
   }

   return (baseValues: T): T => {
      const result = { ...baseValues }

      for (const deviceModifiers of Object.values(appliedDevicesModifiers)) {
         for (const modifier of deviceModifiers) {
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

import type { DeviceModifiers } from '@/DevicesContext/Types'
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ModifierOperation = 'mul' | 'add'

interface IModifierConfig {
   /** Which field names in your flat object this modifier affects */
   fields: string[]
   /** Whether to multiply or add the modifier value */
   operation: ModifierOperation
}

/**
 * @description Central mapping: device modifier name (from XML/DB) → what it does to your stat fields.
 * Add new entries here as you implement more stats.
 *
 * 'mul' = multiply (e.g. 0.9 reload time = 10% faster)
 * 'add' = additive  (e.g. +4 km/h forward speed)
 */
export const MODIFIER_CONFIG: Record<string, IModifierConfig> = {
   // --- Firepower ---
   vehicleGunShotDispersion: {
      fields: ['vehicleMovement', 'vehicleRotation', 'turretRotation', 'afterShot'],
      operation: 'mul',
   },
   vehicleGunShotFullDispersion: {
      fields: ['accuracy'],
      operation: 'mul',
   },
   vehicleGunReloadTime: {
      fields: ['reloadTime'],
      operation: 'mul',
   },
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      operation: 'mul',
   },

   // --- Mobility ---
   vehicleEnginePower: {
      fields: ['enginePower'],
      operation: 'mul',
   },
   vehicleForwardMaxSpeed: {
      fields: ['forwardSpeed'],
      operation: 'add',
   },
   vehicleBackwardMaxSpeed: {
      fields: ['backwardSpeed'],
      operation: 'add',
   },
   vehicleAllGroundRotationSpeed: {
      fields: ['traverseSpeed'],
      operation: 'mul',
   },
   vehicleTurretOrCuttingRotationSpeed: {
      fields: ['turretTraverseSpeed'],
      operation: 'mul',
   },

   // --- Survivability ---
   vehicleStrength: {
      fields: ['maxHealth'],
      operation: 'mul',
   },
   vehicleChassisStrength: {
      fields: ['chassisHealth'],
      operation: 'mul',
   },
   vehicleChassisRepairSpeed: {
      fields: ['chassisRepairSpeed'],
      operation: 'mul',
   },
   vehicleChassisFallDamage: {
      fields: ['fallDamage'],
      operation: 'mul',
   },
   vehicleRepairSpeed: {
      fields: ['repairSpeed'],
      operation: 'mul',
   },
   vehicleFireChance: {
      fields: ['fireChance'],
      operation: 'mul',
   },

   // --- Stealth / Recon ---
   vehicleCircularVisionRadius: {
      fields: ['viewRange'],
      operation: 'mul',
   },
   vehicleStillCircularVisionRadius: {
      fields: ['stillViewRange'],
      operation: 'mul',
   },
   vehicleStillCamouflage: {
      fields: ['camouflageStill'],
      operation: 'mul',
   },
   vehicleCamouflage: {
      fields: ['camouflageMoving'],
      operation: 'mul',
   },
}

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

            if (config.operation === 'mul') {
               // e.g. reloadTime: 7.8 * 0.9 = 7.02
               ;(result[key] as number) *= modifier.value
            } else {
               // e.g. forwardSpeed: 72 + 4 = 76
               ;(result[key] as number) += modifier.value
            }
         }
      }
   }

   return result
}

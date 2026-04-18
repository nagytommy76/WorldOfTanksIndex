import type { DeviceModifiers } from '@/DevicesContext/Types'

interface IBaseDispersionValues {
   vehicleMovement: number
   vehicleRotation: number
   turretRotation: number
   afterShot: number
}
/**
 *
 * @param baseValues all base dispersion values
 * @param appliedDevicesModifiers comes from DeviceContext
 * @returns new dispersion values
 * @description Applies stacking dispersion modifiers from all active devices.
 * Each matching modifier is multiplied onto the running value (stacks multiplicatively).
 * Returns base values unchanged if no modifiers are applied.
 */
export function applyDispersionModifiers<BaseValueType extends IBaseDispersionValues>(
   baseValues: BaseValueType,
   appliedDevicesModifiers: DeviceModifiers | null,
): IBaseDispersionValues {
   // If no devices are applied, return base values immediately
   if (!appliedDevicesModifiers || Object.keys(appliedDevicesModifiers).length === 0) {
      return baseValues
   }

   // Initialize running values FROM base — this fixes the zero-bug
   let vehicleMovement = baseValues.vehicleMovement
   let vehicleRotation = baseValues.vehicleRotation
   let turretRotation = baseValues.turretRotation
   let afterShot = baseValues.afterShot

   // Iterate over each device's modifier list (e.g. aimingStabilizer, improvedRotationMechanism)
   for (const deviceModifiers of Object.values(appliedDevicesModifiers)) {
      for (const modifier of deviceModifiers) {
         // Stack multiplicatively — both aimingStabilizer and improvedRotationMechanism
         // can have vehicleGunShotDispersion, so they both apply correctly in sequence
         if (modifier.name === 'vehicleGunShotDispersion') {
            vehicleMovement *= modifier.value
            vehicleRotation *= modifier.value
            turretRotation *= modifier.value
            afterShot *= modifier.value
         }
      }
   }

   return { vehicleMovement, vehicleRotation, turretRotation, afterShot }
}

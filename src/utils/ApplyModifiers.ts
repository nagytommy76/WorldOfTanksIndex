import type { DeviceModifiers } from '@/DevicesContext/Types'
import ReturnPercentValue from '@/helpers/returnPercentValue'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ModifierOperation = 'mul' | 'add' | 'mulAdd' | 'mulSubtract'

interface IModifierConfig {
   /** Which field names in your flat object this modifier affects */
   fields: string[]
   /** Whether to multiply or add the modifier value */
   operation: ModifierOperation
}

/**
 * @description Central mapping: device modifier name (from XML/DB) → what it does to your stat fields.
 *
 * 'mul' = multiply (e.g. 0.9 reload time = 10% faster)
 * 'add' = additive  (e.g. +4 km/h forward speed)
 */
export const MODIFIER_CONFIG: Record<string, IModifierConfig> = {
   crewLevel: {
      fields: ['crewLevel'],
      operation: 'mul',
   },
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
      operation: 'mulSubtract',
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
   vehicleSpeedGain: {
      fields: ['terrainResistance1', 'terrainResistance2', 'terrainResistance3'],
      operation: 'mulSubtract',
   },

   // --- Survivability ---
   vehicleStrength: {
      fields: ['maxHealth'],
      operation: 'mul',
   },
   /**
    * @description Track healt
    */
   vehicleChassisStrength: {
      fields: ['chassisHealth', 'chassisRegenHealth'],
      operation: 'mul',
   },
   vehicleChassisRepairSpeed: {
      fields: ['chassisRepairSpeed'],
      operation: 'mulSubtract',
   },
   vehicleRepairSpeed: {
      fields: ['chassisRepairSpeed'],
      operation: 'mulSubtract',
   },
   vehicleFireChance: {
      fields: ['fireChance'],
      operation: 'mul',
   },
   /**
    * @description
    */
   vehicleAmmoBayEngineFuelStrength: {
      fields: [
         'ammoRackStrength',
         'ammoRackRegenStrength',
         'engineStrength',
         'engineRegenStrength',
         'fuelTankStrength',
         'fuelTankRegenStrength',
      ],
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
   vehicleStillCircularVisionRadiusDeluxe: {
      fields: ['stillViewRange'],
      operation: 'mul',
   },
   vehicleStillCamouflage: {
      fields: ['camouflageStill'],
      operation: 'mulAdd',
   },
   vehicleStillCamouflageDeluxe: {
      fields: ['camouflageStill'],
      operation: 'mulAdd',
   },
   vehicleCamouflage: {
      fields: ['camouflageMoving', 'camouflageStill'],
      operation: 'mulAdd',
   },
   vehicleEnemySpottingTime: {
      fields: ['enemySpottingTime'],
      operation: 'add',
   },
   vehicleOwnSpottingTime: {
      fields: ['ownSpottingTime'],
      operation: 'add',
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
 * T100LT Example
 *
 * LOADER CREW LOADNIG TIME:
 * 
 * - 7.8s - Reload time (base, from XML)
 * - 110 - Crew efficiency level with fully trained crew
 * 7.8s * 0.875 / (0.00375 * 110 + 0.5)
 *
 * 7.8s * 0.875 = 6.825
 * 6.825 / 0.9125 = 7.479
 * 
 * COMMANDER VIEW RANGE EXAMPLE:
 * 390m view range from XML
 * 110 - Crew efficiency level with fully trained crew
 * 390m / 0.875 * (0.00375 * 50 + 0.5)
 * 
 *    Degressive stat (e.g. reload time, aim time — lower is better)
      actualStat = nominalStat * 0.875 / (0.00375 * effectiveSkill + 0.5)

      Progressive stat (e.g. view range — higher is better)
      actualStat = nominalStat / 0.875 * (0.00375 * effectiveSkill + 0.5)


         reloadTime: 7.8s
         aimingTime: 2s
         circularVisionRadius: 390m

         Without ventilation (100% crew):

        @example Effective skill = 100 + (100 * 0.1) = 110%
         Reload: 7.8 * 0.875 / (0.00375 * 110 + 0.5) = 7.8 * 0.875 / 0.9125 ≈ 7.48s

         With ventilation (+5%):

         Effective skill = (105) + (105 * 0.1) = 115.5%
         Reload: 7.8 * 0.875 / (0.00375 * 115.5 + 0.5) = 7.8 * 0.875 / 0.93 ≈ 7.34s
 */

function testFunction(nominalStat: number, crewEfficiencyLevel: number | undefined = 100) {
   if (crewEfficiencyLevel === 100) {
      // In this case we don't need to calculate anything because the base stats are coming from the XML files
   }

   const actualStat = (nominalStat * 0.875) / (0.00375 * crewEfficiencyLevel + 0.5)
   return actualStat
}

console.log(testFunction(7.8, 110))

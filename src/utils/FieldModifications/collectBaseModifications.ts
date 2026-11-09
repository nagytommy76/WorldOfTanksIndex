import type { IFieldModificationLevel } from './groupFieldModificationLevels'
import type { IAppliedModifications } from '@/VehicleContext/FieldModificationContext/Types'

/**
 * @description Collects the base modification KPIs of the unlocked levels (I..unlockedLevel), one entry per name + operation.
 * The same KPI on more levels stacks: 'mul' adds up the percentages (1.02 and 1.03 → 1.05), 'add' sums the terms.
 * @param levels Levels of the tree, from level I upwards without gaps
 * @param unlockedLevel 0 = nothing unlocked, n = levels I..n are unlocked
 * @returns null when the unlocked levels have no base modification
 * @example
 * // level II and IV of the role_LT_scout tree
 * {
 *   vehicleAllGroundRotationSpeed: [
 *       { name: 'vehicleAllGroundRotationSpeed', operation: 'mul', value: 1.02 }
 * ],
 *   vehicleGunShotDispersionChassisMovement: [
 *       { name: 'vehicleGunShotDispersionChassisMovement', operation: 'mul', value: 0.99 }
 *  ]
 * }
 */
export function collectBaseModifications(
   levels: IFieldModificationLevel[],
   unlockedLevel: number,
): IAppliedModifications | null {
   const applied: IAppliedModifications = {}

   for (const level of levels.slice(0, Math.max(0, unlockedLevel))) {
      const modification = level.mainStep?.modification
      if (modification?.kind !== 'base') continue

      for (const { name, operation, value } of modification.kpi) {
         const modifiers = (applied[name] ??= [])
         const existing = modifiers.find((modifier) => modifier.operation === operation)

         if (!existing) modifiers.push({ name, operation, value })
         else existing.value += operation === 'mul' ? value - 1 : value
      }
   }

   return Object.keys(applied).length > 0 ? applied : null
}

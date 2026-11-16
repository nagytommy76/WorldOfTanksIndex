import ReturnPercentValue from '@/helpers/returnPercentValue'
import MODIFIER_CONFIG, { type ModifierOperation } from '../modifierConfig'

import type { StatTransformer } from '../applyStatPipeline'
import type {
   IAppliedModification,
   IAppliedModifications,
   IAppliedPairModifications,
} from '@/VehicleContext/FieldModificationContext/Types'

/**
 * @description Applies the base modifications of the unlocked levels to a flat object of vehicle stats
 * @param appliedBaseModifications null = no Field Mod unlocked
 * @example
 * applyStatPipeline({ chassisHealth: 300, chassisRegenHealth: 200 }, [
 *    createBaseFieldModTransformer(appliedBaseModifications),
 *    createPairFieldModTransformer(appliedPairModifications),
 * ])
 */
export default function createBaseFieldModTransformer<T extends Record<string, number>>(
   appliedBaseModifications: IAppliedModifications | null,
): StatTransformer<T> {
   return createFieldModTransformer(flattenModifications(appliedBaseModifications))
}

/**
 * @description Applies the chosen pair option of every level to a flat object of vehicle stats
 * @param appliedPairModifications null = no pair option chosen
 */
export function createPairFieldModTransformer<T extends Record<string, number>>(
   appliedPairModifications: IAppliedPairModifications | null,
): StatTransformer<T> {
   const levels = Object.values(appliedPairModifications ?? {})
   return createFieldModTransformer(levels.flatMap(flattenModifications))
}

/**
 * @description Every KPI of the applied modifications in one list
 */
function flattenModifications(applied: IAppliedModifications | null | undefined): IAppliedModification[] {
   return applied ? Object.values(applied).flat() : []
}

/**
 * @description Applies the KPIs one after the other to the stats they affect, the other stats stay unchanged
 */
function createFieldModTransformer<T extends Record<string, number>>(
   modifications: IAppliedModification[],
): StatTransformer<T> {
   // Nothing applied — return the values unchanged
   if (modifications.length === 0) return (values) => values

   return (values) => {
      const result: Record<string, number> = { ...values }

      for (const modification of modifications) {
         const config = MODIFIER_CONFIG[modification.name]
         if (!config) continue

         for (const field of config.fields) {
            if (field in result) result[field] = modifyStat(result[field], modification, config.operation)
         }
      }

      return result as T
   }
}

/**
 * @description The stat after one KPI. An 'add' KPI is a flat term in the unit of the stat,
 * a 'mul' KPI is a factor applied the way the stat's config says
 * @example
 * modifyStat(60, { name: 'vehicleForwardMaxSpeed', operation: 'add', value: -2 }, 'add')    // 58
 * modifyStat(10, { name: 'vehicleGunReloadTime', operation: 'mul', value: 0.97 }, 'mul')    // 9.7
 * modifyStat(20, { name: 'vehicleCamouflage', operation: 'mul', value: 1.02 }, 'mulAdd')    // 22, +2 percentage points
 * modifyStat(1, { name: 'vehicleSpeedGain', operation: 'mul', value: 1.03 }, 'mulSubtract') // 0.97, 3% less resistance
 */
function modifyStat(
   stat: number,
   { operation, value }: IAppliedModification,
   statOperation: ModifierOperation,
): number {
   if (operation === 'add') return stat + value

   switch (statOperation) {
      case 'mulAdd':
         return stat + ReturnPercentValue(value)
      case 'mulSubtract':
         return stat * (1 - (value - 1))
      default:
         return stat * value
   }
}

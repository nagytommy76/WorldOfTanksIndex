import ReturnPercentValue from '@/helpers/returnPercentValue'
import MODIFIER_CONFIG from '../modifierConfig'

import type { StatTransformer } from '../applyStatPipeline'
import { IAppliedModifications } from '@/VehicleContext/FieldModificationContext/Types'

export default function createBaseFieldModTransformer<T extends Record<string, number>>(
   appliedBaseModifications: IAppliedModifications | null,
): StatTransformer<T> {
   // No Field Mods equipped — return the values unchanged
   if (!appliedBaseModifications || Object.keys(appliedBaseModifications).length === 0) {
      return (values) => values
   }

   return (baseValues: T): T => {
      const result = { ...baseValues }

      for (const baseModifications of Object.values(appliedBaseModifications)) {
         for (const modifier of baseModifications) {
            const config = MODIFIER_CONFIG[modifier.name]
            if (!config) continue

            for (const configField of config.fields) {
               if (!(configField in result)) continue

               const key = configField as keyof T

               switch (config.operation) {
                  case 'mul':
                     ;(result[key] as number) *= modifier.value
                     break
                  case 'add':
                     const percentValue = ReturnPercentValue(modifier.value)
                     ;(result[key] as number) += percentValue
                     break
               }
            }
         }
      }

      return result
   }
}

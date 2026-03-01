import type { DiffDirection, IFieldDifferences } from '@/types/VehicleDetails/Modifiers'

export default abstract class Modifier {
   buildFieldDifference(base: number, compared: number, direction: DiffDirection): IFieldDifferences {
      const difference = compared - base
      const percentDifference: number = base !== 0 ? (difference / base) * 100 : 0 // delta / base * 100
      const improved = direction === 'higher-is-better' ? difference > 0 : difference < 0

      return {
         base,
         compared,
         difference,
         percentDifference,
         improved,
         neutral: difference === 0,
      }
   }
}

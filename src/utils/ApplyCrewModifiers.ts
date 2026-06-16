import CREW_MODIFIER_CONFIG from './crewModifierConfig'
import CrewMember from '@/CrewContext/Classes/Crew'

import type { StatTransformer } from './applyStatPipeline'

/**
 * @url https://worldoftanks.fandom.com/wiki/Crew#Proficiency
 * @url https://www.reddit.com/r/WorldofTanks/comments/1ggtfvx/crew_20_game_mechanics_deepdive/
 * 
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
export default function createCrewTransformer<T extends Record<string, number>>(
   crewMember: CrewMember | undefined,
): StatTransformer<T> {
   if (!crewMember)
      return (baseValues: T): T => {
         return baseValues
      }

   return (baseValues: T): T => {
      const vehicleParameters = { ...baseValues }

      for (const element of crewMember.affectedVehicleStats) {
         const config = CREW_MODIFIER_CONFIG[element]
         if (!config) continue

         for (const field of Object.keys(vehicleParameters)) {
            if (config.fields.includes(field)) {
               const nominal = vehicleParameters[field] as number

               const key = field as keyof T

               switch (config.operation) {
                  case 'degressive':
                     ;(vehicleParameters[key] as number) =
                        (nominal * 0.875) / (0.00375 * crewMember.efficiencyLevel + 0.5)
                     break
                  case 'progressive':
                     // const roundedCrewLevel = Math.round(crewMember.efficiencyLevel)

                     // ;(vehicleParameters[key] as number) =
                     //    (nominal / 0.875) * (0.003751 * crewMember.efficiencyLevel + 0.5)

                     const crewLevel = crewMember.efficiencyLevel / 100

                     const effectiveValue = 0.57 + 0.43 * crewLevel
                     // console.log('CREW LEVEL testing : ', roundedCrewLevel)
                     ;(vehicleParameters[key] as number) = nominal * effectiveValue

                     break
               }
            }
         }
      }

      return vehicleParameters
   }
}
/**
 *
 * Vehicle attributes instead scale using the formula
 * 0.57 + (0.43 × crewLevel). For example, if your commander is at 120%,
 * your view range will be buffed by 0.57 + (0.43 × 1.2) = 1.086 = +8.6%.
 *  A handful of skills also use this formula.
 */

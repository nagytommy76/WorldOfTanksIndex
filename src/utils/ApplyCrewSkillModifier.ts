import CREW_SKILLS_MODIFIER_CONFIG from './crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import type { StatTransformer } from './applyStatPipeline'

/**
 * 
 * @param crewMember 
 * @returns calculatedSkillResult - 
 * @example
 *    Recon's base bonus = 2%
 * 
      baseBonus         = 2% view range
      effectiveQual     = 110%
      scaledBonus       = 2% × (110 / 100) = 2.2%

      Applied to view range:
      406.77m × (1 + 0.022) = 406.71 × 1.022 ≈ 415.71894m ≈ 415.72m
 */
export default function createCrewSkillsTransformer<T extends Record<string, number>>(
   crewMember: CrewMember | Commander | undefined,
): StatTransformer<T> {
   if (!crewMember || crewMember.appliedCrewSkills === undefined)
      return (baseValues: T): T => {
         return baseValues
      }

   return (baseValues: T): T => {
      const calculatedSkillResult = { ...baseValues }
      const appliedCrewSkills = crewMember.appliedCrewSkills
      if (appliedCrewSkills === undefined) return calculatedSkillResult

      for (const [skillName, skills] of appliedCrewSkills) {
         for (const skill of skills) {
            const config = CREW_SKILLS_MODIFIER_CONFIG[skill.paramName]
            if (!config) continue

            for (const configField of config.fields) {
               if (!(configField in calculatedSkillResult)) continue
               const key = configField as keyof T

               switch (config.measureType) {
                  case 'percents':
                     const scaledBonus = (skill.value - 1) * (crewMember.efficiencyLevel / 100)
                     /**
                      * In this case I check if a crewMember is !Commander
                      * and isCommanderBonusApplied is true (+10% bonus switch turned on)
                      */
                     // if (crewMember instanceof CrewMember && crewMember.isCommanderBonusApplied) {
                     switch (config.operation) {
                        case 'degressive':
                           console.log(`${crewMember.primaryRole} has ${calculatedSkillResult[key]}`)
                           // ;(calculatedSkillResult[key] as number) =
                           //    (calculatedSkillResult[key] * 0.875) /
                           //    (0.00375 * crewMember.efficiencyLevel + 0.5)
                           // calculatedSkillResult[key] /= skill.value
                           calculatedSkillResult[key] /= 1 + scaledBonus

                           break
                        case 'progressive':
                           calculatedSkillResult[key] *= 1 + scaledBonus
                           break
                     }
                     // } else {
                     //    calculatedSkillResult[key] *= 1 + scaledBonus
                     //    console.log('ELSE APPLY CREW: ', scaledBonus)
                     // }

                     break
               }
            }
         }
      }

      return calculatedSkillResult
   }
}

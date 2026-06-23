import CREW_SKILLS_MODIFIER_CONFIG from './crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import type { StatTransformer } from './applyStatPipeline'

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
                     /**
                      * A probléma:
                      *
                      * effectiveSkill = (primarySkill + ventilationBonus) + ((commanderSkill + ventilationBonus) * 0.1)
                      *
                      * (100 + 5) + ((100 + 5) * 0.1) = 105 + 10.5 = 115.5%
                      *
                      * tehát a commander bonus-t a commander efficiency level alapján kell hozzáadni a többi crew memberhaz
                      *
                      */

                     /**
                      * In this case I check if a crewMember is !Commander
                      * and isCommanderBonusApplied is true (+10% bonus switch turned on)
                      */
                     if (crewMember instanceof CrewMember && crewMember.isCommanderBonusApplied) {
                        switch (config.operation) {
                           case 'degressive':
                              console.log(`${crewMember.primaryRole} has ${calculatedSkillResult[key]}`)
                              ;(calculatedSkillResult[key] as number) =
                                 (calculatedSkillResult[key] * 0.875) /
                                 (0.00375 * crewMember.efficiencyLevel + 0.5)
                              calculatedSkillResult[key] /= skill.value

                              break
                        }
                     } else {
                        calculatedSkillResult[key] *= skill.value
                        console.log('ELSE APPLY CREW')
                     }

                     // const final = skill.value / 100 + multiplyValue
                     // console.log('MULTIPLYED 2222: ', final)

                     //    calculatedSkillResult[key] *= skill.value
                     // } else {
                     // ;(calculatedSkillResult[key] as number) =
                     //    (calculatedSkillResult[key] / 0.875) * (0.00375 * crewMember.efficiencyLevel + 0.5)
                     // console.log('CSÁÁÁÉÉ:::  ', calculatedSkillResult[key])

                     // }

                     break
               }
            }
         }
      }

      return calculatedSkillResult
   }
}

/**
 *
 * Vehicle attributes instead scale using the formula
 * 0.57 + (0.43 × crewLevel). For example, if your commander is at 120%,
 * your view range will be buffed by 0.57 + (0.43 × 1.2) = 1.086 = +8.6%.
 *  A handful of skills also use this formula.
 */

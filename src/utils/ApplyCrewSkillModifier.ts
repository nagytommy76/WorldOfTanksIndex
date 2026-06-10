import CREW_SKILLS_MODIFIER_CONFIG from './crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'

import type { StatTransformer } from './applyStatPipeline'

export default function createCrewSkillsTransformer<T extends Record<string, number>>(
   crewMember: CrewMember | undefined,
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
         // appliedCrewSkills.values().forEach((skill) => {
         for (const skill of skills) {
            const config = CREW_SKILLS_MODIFIER_CONFIG[skill.paramName]
            if (!config) continue

            console.log('SKILL NAME : ', skillName)
            console.log('config: : ', config)

            for (const configField of config.fields) {
               if (!(configField in calculatedSkillResult)) continue
               const key = configField as keyof T
               console.log('configField:  ', configField)
               console.log('KEY:  ', key)

               switch (config.measureType) {
                  case 'percents':
                     console.log('calculatedSkillResult : ', calculatedSkillResult[key])

                     // calculatedSkillResult[key] =
                     // (skill.value / 0.8741) * (0.003773 * crewMember.efficiencyLevel + 0.5)
                     // (skill.value / 0.875) * (0.00375 * crewMember.efficiencyLevel + 0.5)
                     // (calculatedSkillResult[key] / 0.875) * (0.00375 * crewMember.efficiencyLevel + 0.5)

                     // calculatedSkillResult[key] *= skill.value
                     ;(calculatedSkillResult[key] as number) *= skill.value
                     // console.log('HELLÓ22222:   ', skill.value)
                     break
               }
            }
         }
      }

      return calculatedSkillResult
   }
}

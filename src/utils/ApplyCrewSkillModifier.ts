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

            for (const configField of config.fields) {
               if (!(configField in calculatedSkillResult)) continue
               const key = configField as keyof T

               switch (config.measureType) {
                  case 'percents':
                     console.log('HELLÓ: ', skill)
                     ;(calculatedSkillResult[key] as number) *= skill.value
                     break
               }
            }
         }
      }

      return calculatedSkillResult
   }
}

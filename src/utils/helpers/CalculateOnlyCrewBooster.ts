import CREW_SKILLS_CONFIG from '../crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import type { CrewSkillModifiers } from '@/CrewContext/Types'

import ReturnCalculatedSkillResult from './ReturnCalculatedSkillResult'

export default function CalculateOnlyCrewBooster<T extends Record<string, number>>(
   appliedCrewSkills: Map<
      string,
      {
         crewSkillBoosterModifiers: CrewSkillModifiers[]
         crewSkillModifier: {
            boostSkill: number
            mul: number
         }
      }
   >,
   calculatedSkillResult: T,
   crewMember: CrewMember | Commander,
) {
   for (const [skillName, skillModifiers] of appliedCrewSkills) {
      for (const skillModifier of skillModifiers.crewSkillBoosterModifiers) {
         if (!CREW_SKILLS_CONFIG[skillName]) continue
         const foundConfigSkill = CREW_SKILLS_CONFIG[skillName][skillModifier.paramName]
         if (!foundConfigSkill) continue

         for (const configField of foundConfigSkill.fields) {
            const skillValue = Math.abs(skillModifier.value)
            const key = configField

            ReturnCalculatedSkillResult(
               calculatedSkillResult,
               foundConfigSkill,
               crewMember,
               skillValue,
               key,
               skillName,
            )
         }
      }
   }
}

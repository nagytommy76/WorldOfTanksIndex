import CREW_SKILLS_CONFIG from '../crewSkillConfig'
import CrewMember, { IappliedCrewSkills } from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import ReturnCalculatedSkillResult from './ReturnCalculatedSkillResult'

export default function CalculateOnlyCrewSkill<T extends Record<string, number>>(
   appliedCrewSkills: IappliedCrewSkills,
   calculatedSkillResult: T,
   crewMember: CrewMember | Commander,
   calculateSituational: boolean = false,
   hasClip: boolean = false,
) {
   for (const [skillName, skillModifiers] of appliedCrewSkills) {
      if (skillName === 'loader_magMastery' && !hasClip) continue
      if (skillName === 'camouflage') continue
      for (const skillModifier of skillModifiers) {
         if (!CREW_SKILLS_CONFIG[skillName]) continue

         const foundConfigSkill = CREW_SKILLS_CONFIG[skillName][skillModifier.paramName]

         if (!foundConfigSkill) continue
         if (!calculateSituational && foundConfigSkill.isSituational) continue

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

import CREW_SKILLS_CONFIG from '../crewSkillConfig'
import CrewMember, { IappliedCrewSkills } from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import ReturnCalculatedSkillResult from './ReturnCalculatedSkillResult'

export default function CalculateCrewSkillAndBooster<T extends Record<string, number>>(
   appliedCrewSkills: IappliedCrewSkills,
   calculatedSkillResult: T,
   crewMember: CrewMember | Commander,
   calculateSituational: boolean = false,
   hasClip: boolean = false,
) {
   for (const [skillName, skillModifiers] of appliedCrewSkills) {
      if (skillName === 'loader_magMastery' && !hasClip) continue
      if (!crewMember.appliedCrewBattleBoosters) continue
      if (skillName === 'camouflage') continue
      for (const skillModifier of skillModifiers) {
         if (!CREW_SKILLS_CONFIG[skillName]) continue

         const foundConfigSkill = CREW_SKILLS_CONFIG[skillName][skillModifier.paramName]

         if (!foundConfigSkill) continue
         if (!calculateSituational && foundConfigSkill.isSituational) continue

         for (const configField of foundConfigSkill.fields) {
            const foundCrewBoosterMulValue = crewMember.appliedCrewBattleBoosters.get(skillName)
            const skillValue = foundCrewBoosterMulValue
               ? Math.abs(skillModifier.value) * foundCrewBoosterMulValue.crewSkillModifier.mul
               : Math.abs(skillModifier.value)
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

import type { CrewSkillModifier } from '@/Classes/CrewSkills'
import type { GrouppedCrewRolesType } from '../Context/CrewSkillContext'

export default function findCrewSkillForBooster(
   grouppedCrewSkills: GrouppedCrewRolesType,
   boosterSplit: string,
): CrewSkillModifier[] {
   let foundModifier: CrewSkillModifier[] = []

   if (boosterSplit === 'naturalCover') {
      const foundCamo = grouppedCrewSkills.common.find((skill) => skill.xmlName === 'camouflage')?.modifiers
      if (foundCamo) foundModifier = foundCamo
   }

   Object.values(grouppedCrewSkills).map((skills) => {
      for (const skill of skills) {
         if (skill.xmlName === boosterSplit) {
            foundModifier = skill.modifiers
         }
      }
   })

   return foundModifier
}

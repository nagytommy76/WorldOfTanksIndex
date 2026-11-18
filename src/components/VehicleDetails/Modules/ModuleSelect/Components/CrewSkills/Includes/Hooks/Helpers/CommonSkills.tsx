import CrewSkills from '@/Classes/CrewSkills'
import type { ICrewContextActions } from '@/CrewContext/Types'

function SetCommonSkills(
   skill: CrewSkills,
   selectedSkills: string[],
   crewDispatch: (value: ICrewContextActions) => void,
) {
   switch (skill.xmlName) {
      case 'brotherhood':
         if (selectedSkills.includes('brotherhood')) {
            crewDispatch({
               type: 'REMOVE_APPLIED_CREW_MODIFIER',
               payload: skill.xmlName,
            })
         } else {
            crewDispatch({
               type: 'SET_APPLIED_CREW_MODIFIER',
               payload: {
                  name: skill.xmlName,
                  value: skill.modifiers[0].value,
               },
            })
         }
         break
      case 'repair':
         if (!selectedSkills.includes('repair')) {
            crewDispatch({
               type: 'SET_APPLIED_CREW_SKILLS',
               payload: {
                  appliedSkillName: skill.xmlName,
                  crewSkillModifiers: skill.modifiers,
                  role: undefined,
               },
            })
         } else {
            crewDispatch({
               type: 'REMOVE_APPLIED_CREW_SKILLS',
               payload: {
                  skillName: skill.xmlName,
                  crewRole: undefined,
               },
            })
         }
         break
      case 'camouflage':
         if (!selectedSkills.includes('camouflage')) {
            crewDispatch({
               type: 'SET_APPLIED_CREW_SKILLS',
               payload: {
                  appliedSkillName: skill.xmlName,
                  crewSkillModifiers: skill.modifiers,
                  role: undefined,
               },
            })
         } else {
            crewDispatch({
               type: 'REMOVE_APPLIED_CREW_SKILLS',
               payload: {
                  skillName: skill.xmlName,
                  crewRole: undefined,
               },
            })
         }
         break
   }
}

export default SetCommonSkills

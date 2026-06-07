import CrewSkills from '@/Classes/CrewSkills'
import type { ICrewContextActions } from '@/VehicleDetails/Context/CrewContext/Types'
import type { SetStateAction } from 'react'

function SetCommonSkills(
   skill: CrewSkills,
   selectedSkills: string[],
   setSkillsSelected: (value: SetStateAction<number>) => void,
   setCommonSkillsSelected: (value: SetStateAction<number>) => void,
   crewDispatch: (value: ICrewContextActions) => void,
) {
   switch (skill.xmlName) {
      case 'brotherhood':
         if (selectedSkills.includes('brotherhood')) {
            setSkillsSelected((prev) => prev - 1)
            setCommonSkillsSelected((prev) => prev - 1)
            crewDispatch({
               type: 'REMOVE_APPLIED_CREW_MODIFIER',
               payload: skill.xmlName,
            })
         } else {
            setSkillsSelected((prev) => prev + 1)
            setCommonSkillsSelected((prev) => prev + 1)
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
            setCommonSkillsSelected((prev) => prev + 1)
            setSkillsSelected((prev) => prev + 1)
            crewDispatch({
               type: 'SET_APPLIED_CREW_SKILLS',
               payload: {
                  appliedSkillName: skill.xmlName,
                  crewSkillModifiers: skill.modifiers,
                  role: undefined,
               },
            })
         } else {
            setSkillsSelected((prev) => prev - 1)
            setCommonSkillsSelected((prev) => prev - 1)
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
            setCommonSkillsSelected((prev) => prev + 1)
            setSkillsSelected((prev) => prev + 1)
            crewDispatch({
               type: 'SET_APPLIED_CREW_SKILLS',
               payload: {
                  appliedSkillName: skill.xmlName,
                  crewSkillModifiers: skill.modifiers,
                  role: undefined,
               },
            })
         } else {
            setSkillsSelected((prev) => prev - 1)
            setCommonSkillsSelected((prev) => prev - 1)
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

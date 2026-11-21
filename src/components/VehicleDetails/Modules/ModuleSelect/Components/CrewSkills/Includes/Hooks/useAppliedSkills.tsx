import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import type { CrewSkillModifier, ICrewRoles } from '@/Classes/CrewSkills'

export default function useAppliedSkills() {
   const { crewDispatch } = useContext(CrewContext)

   function removeAppliedCrewSkill(skillName: string, crewRole: ICrewRoles) {
      crewDispatch({
         type: 'REMOVE_APPLIED_CREW_SKILLS',
         payload: {
            skillName: skillName,
            crewRole: crewRole,
         },
      })
   }

   function setAppliedCrewSkill(skillName: string, modifiers: CrewSkillModifier[], crewRole: ICrewRoles) {
      crewDispatch({
         type: 'SET_APPLIED_CREW_SKILLS',
         payload: {
            appliedSkillName: skillName,
            crewSkillModifiers: modifiers,
            role: crewRole,
         },
      })
   }

   return { removeAppliedCrewSkill, setAppliedCrewSkill }
}

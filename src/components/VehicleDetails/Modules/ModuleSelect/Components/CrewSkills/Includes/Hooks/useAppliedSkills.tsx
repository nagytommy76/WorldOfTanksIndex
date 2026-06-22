import { useContext, useState } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import type { CrewSkillModifier, ICrewRoles } from '@/Classes/CrewSkills'

export default function useAppliedSkills() {
   const { crewDispatch } = useContext(CrewContext)

   const [skillsSelected, setSkillsSelected] = useState<number>(0)

   function removeAppliedCrewSkill(skillName: string, crewRole: ICrewRoles) {
      setSkillsSelected((prev) => prev - 1)
      crewDispatch({
         type: 'REMOVE_APPLIED_CREW_SKILLS',
         payload: {
            skillName: skillName,
            crewRole: crewRole,
         },
      })
   }

   function setAppliedCrewSkill(skillName: string, modifiers: CrewSkillModifier[], crewRole: ICrewRoles) {
      setSkillsSelected((prev) => prev + 1)
      crewDispatch({
         type: 'SET_APPLIED_CREW_SKILLS',
         payload: {
            appliedSkillName: skillName,
            crewSkillModifiers: modifiers,
            role: crewRole,
         },
      })
   }

   return { skillsSelected, setSkillsSelected, removeAppliedCrewSkill, setAppliedCrewSkill }
}

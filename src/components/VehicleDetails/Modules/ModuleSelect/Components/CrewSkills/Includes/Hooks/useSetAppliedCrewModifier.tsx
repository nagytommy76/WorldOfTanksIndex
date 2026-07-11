import { useContext, useState } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import type { CrewSkillModifier } from '@/Classes/CrewSkills'

export default function useSetAppliedCrewModifier() {
   const { crewDispatch } = useContext(CrewContext)

   const [modifierSkillsSelected, setModifierSkillsSelected] = useState<number>(0)
   function removeAppliedCrewModifier(skillName: string) {
      setModifierSkillsSelected((prev) => prev - 1)
      crewDispatch({
         type: 'REMOVE_APPLIED_CREW_MODIFIER',
         payload: skillName,
      })
   }

   function setAppliedCrewModifier(skillName: string, modifiers: CrewSkillModifier[]) {
      setModifierSkillsSelected((prev) => prev + 1)
      crewDispatch({
         type: 'SET_APPLIED_CREW_MODIFIER',
         payload: {
            name: skillName,
            value: modifiers[0].value,
         },
      })
   }

   return {
      modifierSkillsSelected,
      setModifierSkillsSelected,
      removeAppliedCrewModifier,
      setAppliedCrewModifier,
   }
}

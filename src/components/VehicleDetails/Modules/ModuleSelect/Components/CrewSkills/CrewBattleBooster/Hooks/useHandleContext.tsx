import { Dispatch, SetStateAction, useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import { ICrewRoles } from '@/Classes/CrewSkills'
import type { CrewSkillModifiers } from '@/CrewContext/Types'

export default function useHandleContext(setISSelected: Dispatch<SetStateAction<boolean>>) {
   const { crewDispatch } = useContext(CrewContext)

   function addToContextSetSelected(
      role: ICrewRoles,
      boosterName: string,
      crewSkillBoosterModifiers: CrewSkillModifiers[],
      boostSkill: number | undefined,
      mul: number | undefined,
   ): void {
      crewDispatch({
         type: 'ADD_CREW_BOOSTER',
         payload: {
            crewRoles: role,
            boosterName: boosterName,
            crewSkillModifier: {
               boostSkill: boostSkill || 1,
               mul: mul || 1,
            },
            crewSkillBoosterModifiers,
         },
      })
      setISSelected(false)
   }

   function removeFromContextSetSelected(role: ICrewRoles, boosterName: string): void {
      crewDispatch({
         type: 'REMOVE_CREW_BOOSTER',
         payload: {
            boosterToRemove: boosterName,
            currentCrewRole: role,
         },
      })
      setISSelected(true)
   }

   return { addToContextSetSelected, removeFromContextSetSelected }
}

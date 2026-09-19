import { Dispatch, SetStateAction, useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import { ICrewRoles } from '@/Classes/CrewSkills'

export default function useHandleContext(setISSelected: Dispatch<SetStateAction<boolean>>) {
   const { crewDispatch } = useContext(CrewContext)

   function addToContextSetSelected(
      role: ICrewRoles,
      boosterName: string,
      crewSkillName: string,
      boostSkill: number | undefined,
      mul: number | undefined,
   ): void {
      crewDispatch({
         type: 'ADD_CREW_BOOSTER',
         payload: {
            crewRoles: role,
            boosterName: boosterName,
            crewSkillName: crewSkillName,
            crewSkillModifier: {
               boostSkill: boostSkill || 1,
               mul: mul || 1,
            },
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

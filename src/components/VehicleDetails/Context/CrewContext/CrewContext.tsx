'use client'
import { createContext, useReducer, useEffect, useContext } from 'react'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import type { ICrewMembers } from '@/types/VehicleDetails/Crew'
import type { CrewMembersType, ICrewContext } from './Types'
import type { IRolesNonCommander } from '@/Classes/CrewSkills'
import { crewInitialState, initialCrewMembers } from './Types'

import CrewMember from './Classes/Crew'
import Commander from './Classes/Commander'

import CrewReducer from './CrewReducer'

export const CrewContext = createContext<ICrewContext>({
   crewDispatch: () => null,
   crewReducer: {
      crewMembers: initialCrewMembers,
      commander: {} as Commander,
   },
})

export default function CrewContextProvider({
   children,
   crewMembers,
}: {
   children: React.ReactNode
   crewMembers: ICrewMembers[]
}) {
   const [crewReducer, crewDispatch] = useReducer(CrewReducer, crewInitialState)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)

   useEffect(() => {
      const crewHelperObject = { ...initialCrewMembers } as CrewMembersType

      for (const member of crewMembers) {
         switch (member.primary) {
            case 'commander':
               const commander = new Commander({ primaryRole: 'commander', secondaryRole: member.secondary })
               crewDispatch({ type: 'SET_COMMANDER', payload: commander })
               break

            default:
               const crewMember = new CrewMember({
                  primaryRole: member.primary,
                  secondaryRole: member.secondary as IRolesNonCommander[],
               })
               // crewMember.setIsCommanderBonusApplied(crewReducer.crewMode === 'effective' ? true : false)

               crewMember.applyCommanderBonus()
               crewHelperObject[crewMember.primaryRole] = crewMember
               break
         }
      }
      crewDispatch({ type: 'ADD_INITIAL_CREW', payload: crewHelperObject })
   }, [crewMembers])

   // useEffect(() => {
   //    console.log(
   //       'FROM CREW CONTEXT: ON COMMANDER EFFICIENCY CHANGE:  ',
   //       crewReducer.crewMembers.commander?.efficiencyLevel,
   //    )
   // }, [crewReducer.crewMembers.commander?.efficiencyLevel])

   useEffect(() => {
      if (!appliedDevicesModifiers?.improvedVentilation) return
      crewDispatch({
         type: 'SET_APPLIED_CREW_MODIFIER',
         payload: {
            name: 'improvedVentilation',
            value: appliedDevicesModifiers.improvedVentilation[0].value,
         },
      })
   }, [appliedDevicesModifiers])

   return (
      <CrewContext.Provider
         value={{
            crewDispatch,
            crewReducer,
         }}
      >
         {children}
      </CrewContext.Provider>
   )
}

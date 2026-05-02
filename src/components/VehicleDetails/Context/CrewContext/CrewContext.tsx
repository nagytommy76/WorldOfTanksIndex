'use client'
import { createContext, useReducer, useEffect } from 'react'

import type { ICrewMembers } from '@/types/VehicleDetails/Crew'
import type { CrewMembersType, ICrewContext } from './Types'
import { crewInitialState, initialCrewMembers } from './Types'

import CrewMember from './Classes/Crew'

import CrewReducer from './CrewReducer'

export const CrewContext = createContext<ICrewContext>({
   crewDispatch: () => null,
   crewReducer: {
      crewMode: 'base',
      crewMembers: initialCrewMembers,
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

   useEffect(() => {
      const crewHelperObject = initialCrewMembers as CrewMembersType
      for (const member of crewMembers) {
         const crewMember = new CrewMember({
            primaryRole: member.primary,
            secondaryRole: member.secondary,
         })
         crewHelperObject[crewMember.primaryRole] = crewMember
      }
      crewDispatch({ type: 'ADD_INITIAL_CREW', payload: crewHelperObject })
   }, [crewMembers])

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

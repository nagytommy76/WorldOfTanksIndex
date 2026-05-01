'use client'
import { createContext } from 'react'

import type { ICrewMembers } from '@/types/VehicleDetails/Crew'

import Crew from './Classes/Crew'

export const CrewContext = createContext({})

export default function CrewContextProvider({
   children,
   crewMembers,
}: {
   children: React.ReactNode
   crewMembers: ICrewMembers[]
}) {
   for (const member of crewMembers) {
      const crew = new Crew({
         primaryRole: member.primary,
         secondaryRole: member.secondary,
      })
   }

   return <CrewContext.Provider value={{}}>{children}</CrewContext.Provider>
}

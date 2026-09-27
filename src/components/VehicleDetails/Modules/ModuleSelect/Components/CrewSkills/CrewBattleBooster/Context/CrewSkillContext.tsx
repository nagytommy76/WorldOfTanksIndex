'use client'
import CrewSkills, { CrewSkillRoles } from '@/Classes/CrewSkills'
import { createContext, useState, type Dispatch, type SetStateAction } from 'react'

export type GrouppedCrewRolesType = { [Roles in CrewSkillRoles]: CrewSkills[] }

interface ICrewSkillContext {
   crewSkills: GrouppedCrewRolesType
   setCrewSkills: Dispatch<SetStateAction<GrouppedCrewRolesType>>
}

export const CrewSkillContext = createContext<ICrewSkillContext>({
   crewSkills: {} as GrouppedCrewRolesType,
   setCrewSkills: () => {},
})

export default function CrewSkillContextProvider({
   children,
   crewSkills,
}: {
   children: React.ReactNode
   crewSkills: GrouppedCrewRolesType
}) {
   const [crewSkillsState, setCrewSkillsState] = useState(crewSkills)

   return (
      <CrewSkillContext.Provider
         value={{
            crewSkills: crewSkillsState,
            setCrewSkills: setCrewSkillsState,
         }}
      >
         {children}
      </CrewSkillContext.Provider>
   )
}

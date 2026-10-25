import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import useGetRole from '../../CrewBattleBooster/Hooks/useGetRole'

import type { CrewSkillRoles, IRolesNonCommander } from '@/Classes/CrewSkills'

export default function useIsSecondaryRole() {
   const {
      crewReducer: { crewMembers },
   } = useContext(CrewContext)
   const getCrewMemberWithSecondaryRole = useGetRole()

   /**
    * @returns true if no crew member has this as a PRIMARY role, but someone has it as a SECONDARY one
    * e.g: T100LT Commander -> radioman
    */
   function isSecondaryRole(role: CrewSkillRoles): boolean {
      if (role === 'common' || role === 'commander') return false
      if (crewMembers[role as IRolesNonCommander] !== undefined) return false
      return getCrewMemberWithSecondaryRole(role) !== role
   }

   return isSecondaryRole
}

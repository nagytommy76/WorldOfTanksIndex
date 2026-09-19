import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import { ICrewRoles, IRolesNonCommander } from '@/Classes/CrewSkills'

export default function useGetRole() {
   const {
      crewReducer: { crewMembers, commander },
   } = useContext(CrewContext)

   /**
    *
    * @param crewSkillRole ICrewRoles. From booster.icon.split('_')[0] -> crewSkillRole
    * @returns ICrewRoles. The crewMember that has the role/secondaryRole -> crewSkillRole
    * @description Find a crew member that has the role/secondaryRole -> crewSkillRole
    */
   function getCrewMemberWithSecondaryRole(crewSkillRole: ICrewRoles): ICrewRoles {
      let foundCrewRole: ICrewRoles = crewSkillRole
      if (commander.secondaryRole.includes(crewSkillRole)) foundCrewRole = 'commander'
      Object.values(crewMembers).map((member) => {
         if (member) {
            if (member.secondaryRole.includes(crewSkillRole as IRolesNonCommander))
               foundCrewRole = member.primaryRole
         }
      })
      return foundCrewRole
   }

   return getCrewMemberWithSecondaryRole
}

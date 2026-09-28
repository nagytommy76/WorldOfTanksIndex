import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'
import type { ICrewRoles } from '@/Classes/CrewSkills'

import useGetRole from './useGetRole'

export default function useCheckSelected(
   boosterName: string,
   setISSelected: Dispatch<SetStateAction<boolean>>,
) {
   const {
      crewReducer: { crewMembers, commander },
   } = useContext(CrewContext)
   const getCrewMemberWithSecondaryRole = useGetRole()

   /**
    * @description Checks if incompatibleDevices is null -> set blocked
    */
   useEffect(() => {
      const boosterSplit = boosterName.split('_')
      switch (boosterSplit.length) {
         case 1:
            if (commander.appliedCrewBattleBoosters && commander.appliedCrewBattleBoosters.has(boosterName)) {
               setISSelected(false)
            }
            break

         default:
            const crewSkillRole = boosterSplit[0] as ICrewRoles
            const foundCrewRoleToAddCrewBooster = getCrewMemberWithSecondaryRole(crewSkillRole)

            const currentCrewMemberBoosters =
               foundCrewRoleToAddCrewBooster === 'commander'
                  ? commander.appliedCrewBattleBoosters
                  : crewMembers[foundCrewRoleToAddCrewBooster]?.appliedCrewBattleBoosters

            if (currentCrewMemberBoosters && currentCrewMemberBoosters.has(boosterName)) {
               setISSelected(false)
            }
            break
      }
   }, [
      boosterName,
      crewMembers,
      commander.appliedCrewBattleBoosters,
      setISSelected,
      getCrewMemberWithSecondaryRole,
   ])
}

import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import useBlocked from '@/BattleBoosters/Hooks/useBlocked'

import type { IDevice } from '@/types/Devices/Devices'
import { ICrewRoles } from '@/Classes/CrewSkills'

export default function useCrewSelected(booster: IDevice) {
   const { isSelected, setISSelected } = useBlocked()
   const {
      crewDispatch,
      crewReducer: { crewMembers, commander },
   } = useContext(CrewContext)

   function AddCrewBooster() {
      const boosterSplit = booster.icon.split('_')

      switch (boosterSplit.length) {
         /**
          * naturalCover || fireFighting
          */
         case 1:
            break
         /**
          * Crew related boosters -> driver_virtuoso -> virtuosoBattleBooster
          */
         default:
            const crewSkillRole = boosterSplit[0] as ICrewRoles
            const currentCrewMemberBoosters =
               crewSkillRole === 'commander'
                  ? commander.appliedCrewBattleBoosters
                  : crewMembers[crewSkillRole]?.appliedCrewBattleBoosters

            if (currentCrewMemberBoosters && currentCrewMemberBoosters.has(booster.icon)) {
               console.log('')
               crewDispatch({ type: 'REMOVE_CREW_BOOSTER', payload: booster.icon })

               setISSelected(true)
            } else {
               //    console.log('')
               crewDispatch({
                  type: 'ADD_CREW_BOOSTER',
                  payload: {
                     crewRoles: crewSkillRole,
                     boosterName: booster.icon,
                     crewSkillName: booster.name,
                     crewSkillModifier: {
                        boostSkill: booster.crewSkillModifier?.boostSkill.value || 1,
                        mul: booster.crewSkillModifier?.mul.value || 1,
                     },
                  },
               })
               setISSelected(false)
            }

            break
      }
   }
   return {
      isSelected,
      AddCrewBooster,
   }
}

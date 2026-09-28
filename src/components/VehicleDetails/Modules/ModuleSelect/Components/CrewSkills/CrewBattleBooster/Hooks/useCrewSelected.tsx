import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'
import { CrewSkillContext } from '../Context/CrewSkillContext'

import useBlocked from '@/BattleBoosters/Hooks/useBlocked'
import useSetBlocked from './useSetBlocked'

import type { IDevice } from '@/types/Devices/Devices'
import type { ICrewRoles } from '@/Classes/CrewSkills'

import useHandleContext from './useHandleContext'
import useGetRole from './useGetRole'
import findCrewSkillForBooster from './useFindSkill'
import useCheckSelected from './useCheckSelected'

export default function useCrewSelected(booster: IDevice) {
   const { isSelected, setISSelected, isBlocked, setIsBolcked } = useBlocked(false)
   const {
      crewReducer: { crewMembers, commander },
      setHasAppliedCrewBooster,
   } = useContext(CrewContext)
   const { crewSkills } = useContext(CrewSkillContext)

   const { addToContextSetSelected, removeFromContextSetSelected } = useHandleContext(setISSelected)
   const getCrewMemberWithSecondaryRole = useGetRole()
   useSetBlocked(booster.icon, setIsBolcked)
   useCheckSelected(booster.icon, setIsBolcked)

   function AddCrewBooster() {
      const boosterSplit = booster.icon.split('_')
      const foundCrewSkillForBooster = findCrewSkillForBooster(crewSkills, booster.icon)

      switch (boosterSplit.length) {
         /**
          * naturalCover || fireFighting
          */
         case 1:
            if (
               commander.appliedCrewBattleBoosters &&
               commander.appliedCrewBattleBoosters.has(booster.icon)
            ) {
               removeFromContextSetSelected('commander', booster.icon)
               setHasAppliedCrewBooster(undefined)
            } else {
               addToContextSetSelected(
                  'commander',
                  booster.icon,
                  foundCrewSkillForBooster,
                  booster.crewSkillModifier?.boostSkill.value,
                  booster.crewSkillModifier?.mul.value,
               )
               setHasAppliedCrewBooster(booster.icon)
            }
            break
         /**
          * Crew related boosters -> driver_virtuoso -> virtuosoBattleBooster
          */
         default:
            const crewSkillRole = boosterSplit[0] as ICrewRoles

            const foundCrewRoleToAddCrewBooster = getCrewMemberWithSecondaryRole(crewSkillRole)

            const currentCrewMemberBoosters =
               foundCrewRoleToAddCrewBooster === 'commander'
                  ? commander.appliedCrewBattleBoosters
                  : crewMembers[foundCrewRoleToAddCrewBooster]?.appliedCrewBattleBoosters

            if (currentCrewMemberBoosters && currentCrewMemberBoosters.has(booster.icon)) {
               removeFromContextSetSelected(foundCrewRoleToAddCrewBooster, booster.icon)
               setHasAppliedCrewBooster(undefined)
            } else {
               addToContextSetSelected(
                  foundCrewRoleToAddCrewBooster,
                  booster.icon,
                  foundCrewSkillForBooster,
                  booster.crewSkillModifier?.boostSkill.value,
                  booster.crewSkillModifier?.mul.value,
               )
               setHasAppliedCrewBooster(booster.icon)
            }

            break
      }
   }
   return {
      isSelected,
      isBlocked,
      AddCrewBooster,
   }
}

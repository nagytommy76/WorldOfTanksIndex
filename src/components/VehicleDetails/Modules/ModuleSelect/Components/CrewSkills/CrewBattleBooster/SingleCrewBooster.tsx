import { useContext } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import BaseSingleBooster from '@/BattleBoosters/BaseSingleBooster'

import type { IDevice } from '@/types/Devices/Devices'
import type { ICrewRoles } from '@/src/Classes/CrewSkills'

export default function SingleCrewBooster({ booster }: { booster: IDevice }) {
   const { crewDispatch } = useContext(CrewContext)

   function AddCrewBooster(boosterName: string, crewBooster: IDevice) {
      const boosterSplit = boosterName.split('_')

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

            crewDispatch({
               type: 'ADD_CREW_BOOSTER',
               payload: {
                  crewRoles: crewSkillRole,
                  boosterName,
                  crewSkillName: crewBooster.name,
                  crewSkillModifier: {
                     boostSkill: crewBooster.crewSkillModifier?.boostSkill.value || 1,
                     mul: crewBooster.crewSkillModifier?.mul.value || 1,
                  },
               },
            })

            break
      }
   }

   return <BaseSingleBooster booster={booster} AddRemoveItem={() => {}} isBlocked={false} isSelected={true} />
}

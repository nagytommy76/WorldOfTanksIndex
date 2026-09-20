import useCrewSelected from './Hooks/useCrewSelected'
import BaseSingleBooster from '@/BattleBoosters/BaseSingleBooster'

import type { IDevice } from '@/types/Devices/Devices'

export default function SingleCrewBooster({ booster }: { booster: IDevice }) {
   const { AddCrewBooster, isSelected, isBlocked } = useCrewSelected(booster)

   return (
      <BaseSingleBooster
         booster={booster}
         AddRemoveItem={AddCrewBooster}
         isBlocked={isBlocked}
         isSelected={isSelected}
      />
   )
}

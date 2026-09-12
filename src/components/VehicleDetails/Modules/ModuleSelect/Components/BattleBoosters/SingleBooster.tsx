import useSelected from './Hooks/useSelected'
import BaseSingleBooster from '@/BattleBoosters/BaseSingleBooster'

import type { IDevice } from '@/types/Devices/Devices'

export default function SingleBooster({ booster }: { booster: IDevice }) {
   const { AddRemoveBooster, isBlocked, isSelected } = useSelected(booster)
   return (
      <BaseSingleBooster
         booster={booster}
         AddRemoveItem={AddRemoveBooster}
         isBlocked={isBlocked}
         isSelected={isSelected}
      />
   )
}

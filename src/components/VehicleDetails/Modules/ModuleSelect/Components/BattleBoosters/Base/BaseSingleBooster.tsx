import Image from 'next/image'
import type { IDevice } from '@/types/Devices/Devices'

import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import CheckIcon from '@mui/icons-material/Check'

export default function BaseSingleBooster({
   booster,
   AddRemoveItem,
   isBlocked,
   isSelected,
   boosterIconFolder = 'battle_booster',
}: BaseSingleBoosterProps) {
   return (
      <Button
         disabled={isBlocked}
         id='boosters-button'
         onClick={() => {
            AddRemoveItem()
         }}
         sx={{
            opacity: isBlocked ? 0.5 : 1,
         }}
      >
         <Badge color='success' badgeContent={<CheckIcon />} invisible={isSelected}>
            <div className='w-[70px] h-[70px] flex items-center justify-center relative' key={booster.id}>
               <Image
                  src={`/icons/vehicle_modifiers/${boosterIconFolder}/${booster.name}.png`}
                  alt={booster.name}
                  width={70}
                  height={70}
               />
            </div>
         </Badge>
      </Button>
   )
}

export type BaseSingleBoosterProps = {
   booster: IDevice
   AddRemoveItem: () => void
   isBlocked: boolean
   isSelected: boolean
   boosterIconFolder?: string
}

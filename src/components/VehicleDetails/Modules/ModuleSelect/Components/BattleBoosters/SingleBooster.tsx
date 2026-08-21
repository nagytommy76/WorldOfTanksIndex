import Image from 'next/image'
import useSelected from './Hooks/useSelected'

import type { IDevice } from '@/types/Devices/Devices'

import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import CheckIcon from '@mui/icons-material/Check'

export default function SingleBooster({ booster }: { booster: IDevice }) {
   const { AddRemoveBooster, isBlocked, isSelected } = useSelected(booster)
   return (
      <Button
         disabled={isBlocked}
         id='boosters-button'
         onClick={() => {
            AddRemoveBooster()
         }}
         sx={{
            opacity: isBlocked ? 0.5 : 1,
         }}
      >
         <Badge color='success' badgeContent={<CheckIcon />} invisible={isSelected}>
            <div className='w-[70px] h-[70px] flex items-center justify-center relative' key={booster.id}>
               <Image
                  src={`/icons/vehicle_modifiers/battle_booster/${booster.name}.png`}
                  alt={booster.name}
                  width={70}
                  height={70}
               />
            </div>
         </Badge>
      </Button>
   )
}

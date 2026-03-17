import React from 'react'
import Image from 'next/image'

import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

export default function MenuItemOverlay({
   overlayType = 'equipmentTrophyBasic',
   handleClose,
   altName,
   displayName,
   icon,
}: {
   overlayType?:
      | 'equipmentTrophyBasic'
      | 'equipmentTrophyUpgraded'
      | 'equipmentPlus'
      | 'equipmentModernized_1'
      | 'equipmentModernized_2'
      | 'equipmentModernized_3'
      | 'none'
   displayName: string
   altName: string
   icon: string
   handleClose: () => void
}) {
   return (
      <MenuItem className='flex flex-row gap-2' onClick={handleClose}>
         <div className='relative w-[50px] h-[50px]'>
            {overlayType !== 'none' && (
               <Image
                  src={`/icons/vehicle_modifiers/equipments/${overlayType}_overlay.png`}
                  alt={altName}
                  width={100}
                  height={100}
                  className='absolute z-1 w-[85px] h-[85px] -top-6 -left-5'
               />
            )}
            <Image
               src={`/icons/vehicle_modifiers/equipments/${icon}.png`}
               alt={altName}
               width={50}
               height={50}
            />
         </div>
         <Typography variant='body1' fontSize={11}>
            {displayName}
         </Typography>
      </MenuItem>
   )
}

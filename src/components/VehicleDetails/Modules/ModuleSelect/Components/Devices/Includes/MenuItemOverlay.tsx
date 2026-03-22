import React from 'react'
import Image from 'next/image'

import type { OverlayTypes } from '../Types'

export default function MenuItemOverlay({
   overlayType = 'equipmentTrophyBasic',
   altName,
   icon,
}: {
   overlayType?: OverlayTypes
   altName: string
   icon: string
}) {
   return (
      <div className='relative w-[50px] h-[50px]'>
         {overlayType !== 'none' && overlayType !== 'tiers' && (
            <Image
               src={`/icons/vehicle_modifiers/equipments/${overlayType}_overlay.png`}
               alt={altName}
               width={100}
               height={100}
               className='absolute z-1 max-w-[85px] h-[85px] -top-6 -left-5'
            />
         )}
         <Image
            src={`/icons/vehicle_modifiers/equipments/${icon}.png`}
            alt={altName}
            width={50}
            height={50}
            className='max-w-[50px]'
         />
      </div>
   )
}

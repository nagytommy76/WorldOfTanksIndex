import React from 'react'
import Image from 'next/image'

import type { OverlayTypes } from '../../Types'

/**
 * @param {OverlayTypes} overlayType Determines which overlay icon to show (e.g. "equipmentTrophyUpgraded" shows the "U" overlay). "none" means no overlay at all, and "tiers" means the default tiers icon with no overlay.
 * @param {string} altName The alt text for the image, used for accessibility and SEO.
 * @param {string} icon The base icon name for the device (e.g. "enhancedAimDrives"). The component will automatically look for this icon in the /public/icons/vehicle_modifiers/equipments/ folder and append ".png".
 * @param {string} supplySlotIconName Icon overlay for supply slot. ( mobility | firpower | spotting | survivability )
 * @description The overlay image shown on the dropdown menu items. Depends on the device type (e.g. EquipmentPlus_overlay.png).
 * @returns Image container
 */
export default function MenuItemOverlay({
   overlayType = 'equipmentTrophyBasic',
   altName,
   icon,
   supplySlotIconName = undefined,
}: {
   overlayType?: OverlayTypes
   altName: string
   icon: string
   supplySlotIconName?: string
}) {
   return (
      <div className='relative w-[60px] h-[60px] flex items-center justify-center'>
         {overlayType !== 'none' && overlayType !== 'tiers' && overlayType !== 'supplySlotActive' && (
            <Image
               src={`/icons/vehicle_modifiers/equipments/${overlayType}_overlay.png`}
               alt={altName}
               width={100}
               height={100}
               className='absolute z-1 max-w-[90px] h-[90px] -top-5 -left-5'
            />
         )}
         {supplySlotIconName && overlayType === 'supplySlotActive' && (
            <Image
               src={`/icons/details/${supplySlotIconName}.png`}
               alt={altName}
               width={100}
               height={100}
               className='absolute z-1 max-w-[25px] h-[25px] -top-0 -left-0'
            />
         )}
         <Image
            src={`/icons/vehicle_modifiers/equipments/${icon}.png`}
            alt={altName}
            width={65}
            height={65}
            className='max-w-[60px] w-[65px]'
         />
      </div>
   )
}

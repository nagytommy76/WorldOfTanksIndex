import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { IAggregateModifier, IModifier } from '@/types/Devices/Devices'
import type { OverlayTypes } from '../../../Types'

import ModifierRow from './ModifierRow'

/**
 *
 * @param selectedDeviceTypeOverlay Used to determine if the supply slot is active, which affects whether we show boosted values or not.
 * @param aggregateModifiers aggregate modifiers array.
 * @param modifiers modifiers array.
 * @param children Tooltip Header e.g: Coated Optics Class 1.
 * @returns A section containing the tooltip title and its modifiers.
 */
export default function TooltipTitle({
   selectedDeviceTypeOverlay,
   aggregateModifiers,
   modifiers,
   children,
}: {
   modifiers: IModifier[] | null
   aggregateModifiers: IAggregateModifier[] | null
   children: React.ReactNode
   selectedDeviceTypeOverlay: OverlayTypes
}) {
   const { vehicleType } = useContext(VehicleContext)
   // Whether the special (boosted) supply slot is currently active
   const isSpecActive = selectedDeviceTypeOverlay === 'supplySlotActive'

   return (
      <section className='min-w-[260px] min-h-[100px] p-3 bg-[#222222]'>
         {children}
         <div>
            {aggregateModifiers
               ?.filter((modifier) => modifier.vehicleTypes.includes(vehicleType))
               .map((modifier, index) => (
                  <ModifierRow
                     key={index}
                     name={modifier.name}
                     value={modifier.value}
                     specValue={modifier.specValue || null}
                     isSpecActive={isSpecActive}
                  />
               ))}
            {modifiers?.map((modifier, index) => (
               <ModifierRow
                  key={index}
                  name={modifier.name}
                  value={modifier.value}
                  specValue={modifier.specValue}
                  isSpecActive={isSpecActive}
               />
            ))}
         </div>
      </section>
   )
}

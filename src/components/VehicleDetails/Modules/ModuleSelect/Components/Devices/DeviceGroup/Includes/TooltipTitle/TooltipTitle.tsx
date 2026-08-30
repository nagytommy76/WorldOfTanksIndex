import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import Image from 'next/image'

import type { IAggregateModifier, IModifier, ICrewSkillModifier, IDevicePrice } from '@/types/Devices/Devices'
import type { OverlayTypes } from '../../../Types'

import Typography from '@mui/material/Typography'

import ModifierRow from './ModifierRow'
import CrewBoosterValues from './CrewBoosterValues'

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
   crewSkillModifier,
   modifiers,
   children,
   price,
}: {
   modifiers: IModifier[] | null
   aggregateModifiers: IAggregateModifier[] | null
   crewSkillModifier?: ICrewSkillModifier | null
   children: React.ReactNode
   selectedDeviceTypeOverlay: OverlayTypes
   price: IDevicePrice
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
            {crewSkillModifier && (
               <>
                  <CrewBoosterValues name={crewSkillModifier.boostSkill.name} value={2} />
                  <ModifierRow
                     name={crewSkillModifier.mul.name}
                     value={crewSkillModifier.mul.value}
                     specValue={null}
                     isSpecActive={false}
                  />
               </>
            )}
         </div>
         {'crystal' in price && <Price image='bonds' price={price.crystal} />}
         {'credits' in price && <Price image='credits' price={price.credits} />}
         {'equipCoin' in price && <Price image='equipCoin' price={price.equipCoin} />}
      </section>
   )
}

function Price({ image, price }: { price: string | number; image: 'bonds' | 'credits' | 'equipCoin' }) {
   return (
      <div className='flex flex-row mt-5 gap-1 items-center'>
         <Typography variant='caption'>{price}</Typography>
         <Image src={`/icons/currency/${image}.png`} alt={`${image} icon`} width={40} height={40} />
      </div>
   )
}

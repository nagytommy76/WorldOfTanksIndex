import Link from 'next/link'
import Image from 'next/image'
import tiers from '@/lib/tierList'

import type { TechTreeVehiclesType } from '@/types/VehicleDetails/Vehicle'

import getIcon from '@/lib/getVehicleTypeIcon'

export default function TankCard({ vehicle }: { vehicle: TechTreeVehiclesType }) {
   return (
      <div className='w-[170px] h-[60px]'>
         <Link href={`/${vehicle.id}/${vehicle.xmlId}`} title={vehicle.name} className={'w-full h-full'}>
            <div className='relative w-full h-full'>
               <Image
                  className={`w-full h-full object-cover ${vehicle.type}`}
                  src={vehicle.tankDetails?.images.big_icon || ''}
                  alt={vehicle.name}
                  width={200}
                  height={150}
               />
               {typeof vehicle.price === 'number' ? (
                  <p className='absolute bottom-0 right-0 text-[10px]'>{vehicle.price}</p>
               ) : (
                  <p className='absolute bottom-0 right-0 text-[10px]  text-amber-300'>
                     gold: {vehicle.price.gold}
                  </p>
               )}
               <p className='absolute text-[10px] top-0 right-5'>Tier: {tiers[vehicle.tier - 1]}</p>
               <Image
                  className={'absolute top-0 right-0'}
                  src={getIcon(vehicle.type)}
                  alt={vehicle.name}
                  width={10}
                  height={10}
               />
            </div>
            <p
               className={
                  'flex flex-row justify-center items-center h-[25px] w-full text-xs text-center bg-gray-900'
               }
            >
               {vehicle.tankDetails?.name}
            </p>
         </Link>
      </div>
   )
}

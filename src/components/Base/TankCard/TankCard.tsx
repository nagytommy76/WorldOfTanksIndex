import Link from 'next/link'
import Image from 'next/image'

import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

import ATSPG from '@/ImagesTankIcons/AT-SPG.svg'
import heavyTank from '@/ImagesTankIcons/heavyTank.svg'
import lightTank from '@/ImagesTankIcons/lightTank.svg'
import mediumTank from '@/ImagesTankIcons/mediumTank.svg'
import SPG from '@/ImagesTankIcons/SPG.svg'

function getIcon(type: string) {
   switch (type) {
      case 'AT-SPG':
         return ATSPG
      case 'SPG':
         return SPG
      case 'heavyTank':
         return heavyTank
      case 'mediumTank':
         return mediumTank
      case 'lightTank':
         return lightTank
      default:
         return ''
   }
}

export default function TankCard({ vehicle }: { vehicle: ITechTreeVehicleType }) {
   return (
      <Link
         href={`/${vehicle.tank_id}/${vehicle.name}`}
         title={vehicle.name}
         className={'w-[120px] h-[110px]'}
      >
         <div className='relative'>
            <Image
               className={`w-full ${vehicle.type}`}
               src={vehicle.images.small_icon}
               alt={vehicle.name}
               width={100}
               height={100}
            />
            {vehicle.price_gold !== 0 && (
               <p className='absolute bottom-0 right-0 text-[10px] text-amber-300'>{vehicle.price_gold}</p>
            )}
            {vehicle.price_credit !== 0 && (
               <p className='absolute bottom-0 right-0 text-[10px]'>{vehicle.price_credit}</p>
            )}
            <Image
               className={'absolute top-0 right-0'}
               src={getIcon(vehicle.type)}
               alt={vehicle.name}
               width={10}
               height={10}
            />
         </div>
         <p className={'h-[20px] w-full text-xs text-center bg-gray-900'}>{vehicle.short_name}</p>
      </Link>
   )
}

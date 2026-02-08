import Link from 'next/link'
import Image from 'next/image'
import type { PopularTanksType } from '@Types/VehicleDetails/Vehicle'
import type { VehicleRoles } from '@Types/types'

import Typography from '@mui/material/Typography'

import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import getIcon from '@/lib/getVehicleTypeIcon'
import tiers from '@/lib/tierList'
import VehicleRolesComponent from '../../VehicleDetails/Header/VehicleRoles'

export default function TankCard({ singleVehicle }: { singleVehicle: PopularTanksType }) {
   return (
      <Link
         href={`/${singleVehicle.id}/${singleVehicle.xmlId}/modules`}
         className='w-full h-full bg-neutral-950
         flex flex-col items-center justify-center rounded-lg hover:bg-[rgba(65,65,65,0.55)] transition-all duration-300
         '
      >
         <div className='w-full p-3 flex items-center justify-center gap-2 relative'>
            <Image
               src={singleVehicle.tankDetails?.images.big_icon || ''}
               alt={singleVehicle.name}
               width={150}
               height={150}
            />
            <Image
               src={flagSources[singleVehicle.nation].source || ''}
               alt={flagSources[singleVehicle.nation].alt}
               width={40}
               height={40}
               className='absolute top-2 right-2'
            />
            <div className='absolute top-2 left-2'>
               <VehicleRolesComponent
                  vehicleRole={singleVehicle.tags.find((tag) => tag.includes('role')) as VehicleRoles}
                  roleWidth={30}
                  roleHeight={30}
               />
            </div>
         </div>
         <div
            className={`flex flex-row items-center justify-center gap-2 mb-2 
                ${singleVehicle.tankDetails?.is_premium ? 'text-yellow-500' : 'text-white'}`}
         >
            <Typography variant='body2' className='font-semibold text-center'>
               {tiers[singleVehicle.tier - 1]}
            </Typography>
            <Image
               src={getIcon(singleVehicle.type)}
               alt={singleVehicle.type + ' icon'}
               width={15}
               height={15}
            />
            <Typography key={singleVehicle._id} variant='body2' className='font-semibold text-center'>
               {singleVehicle.tankDetails?.short_name || singleVehicle.name}
            </Typography>
         </div>
      </Link>
   )
}

import Image from 'next/image'

import getHeaderData from '@/lib/getHeaderData'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import tiers from '@/lib/tierList'

import type { VehicleRoles } from '@Types/types'

import hangar from '@/Imageshangar-bg.webp'

import Typography from '@mui/material/Typography'

import PlaceholderImg from './PlaceholderImg'
import VehicleRole from '@/Base/VehicleRoles'
import VehicleMechanic from './VehicleMechanic'

export default async function Header({ tank_name, tank_id }: { tank_name: string; tank_id: string }) {
   const vehicleDetails = await getHeaderData(tank_name, tank_id)
   if (!vehicleDetails) return null
   const foundTankRole = vehicleDetails.tags.find((tag) => tag.includes('role'))

   return (
      <header className='min-h-[700px] relative lg:min-h-[750px] max-w-screen'>
         <div className='flex flex-row items-center justify-center gap-2 xl:gap-4 xl:justify-start'>
            <Image
               src={flagSources[vehicleDetails.nation].source || ''}
               alt={flagSources[vehicleDetails.nation].alt || 'Flag'}
               title={flagSources[vehicleDetails.nation].alt}
               width={75}
               height={75}
            />
            {foundTankRole && <VehicleRole vehicleRole={foundTankRole as VehicleRoles} />}
            <Typography variant='h2' className='text-xl font-bold tracking-wide xl:text-5xl'>
               {tiers[vehicleDetails.tier - 1]}
            </Typography>
            <Typography variant='h1' className='text-xl font-medium tracking-wide xl:text-5xl'>
               {('tankDetails' in vehicleDetails && vehicleDetails.tankDetails?.short_name) ||
                  vehicleDetails.name}
            </Typography>
         </div>
         <VehicleMechanic vehicleMechanic={vehicleDetails.mechanics} />
         {'tankDetails' in vehicleDetails && vehicleDetails.tankDetails?.description && (
            <div className='xl:w-[400px] xl:h-[400px] xl:absolute xl:top-5 xl:right-5'>
               <Typography variant='h5' gutterBottom>
                  Description
               </Typography>
               <Typography variant='body2' className='elipsis tracking-wider text-sm'>
                  {vehicleDetails.tankDetails?.description}
               </Typography>
            </div>
         )}
         <PlaceholderImg tank_name={tank_name} />
         <Image
            className='absolute bottom-0 lg:top-0 left-0 -z-2 object-cover '
            src={hangar.src}
            alt={'Hangar background'}
            width={1920}
            height={900}
         />
      </header>
   )
}

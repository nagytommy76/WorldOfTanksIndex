import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'
import type { ITankData } from '@/types/VehicleDetails/Vehicle'
import Image from 'next/image'

import hangar from '@/Imageshangar-bg.webp'

import Typography from '@mui/material/Typography'

import getIcon from '@/lib/getVehicleTypeIcon'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import tiers from '@/lib/tierList'

import PlaceholderImg from './PlaceholderImg'

async function getHeaderData(tank_name: string, tank_id: string) {
   try {
      await dbConnect()
      const vehicleDetails = await VehicleModel.findOne({
         id: Number(tank_id),
         xmlId: tank_name,
      }).select([
         'tankDetails.name',
         'tankDetails.short_name',
         'tankDetails.images',
         'tankDetails.description',
         'type',
         'tier',
         'nation',
      ])

      return vehicleDetails as Pick<ITankData, 'tankDetails' | 'type' | 'tier' | 'nation'>
   } catch (error) {
      console.log(error)
   }
}

export default async function Header({ tank_name, tank_id }: { tank_name: string; tank_id: string }) {
   const vehicleDetails = await getHeaderData(tank_name, tank_id)
   if (!vehicleDetails) return null

   return (
      <header className='min-h-[260px] relative lg:min-h-[750px] max-w-screen'>
         <div className='flex flex-row items-center gap-3 text-[]'>
            <Image
               src={flagSources[vehicleDetails.nation].source || ''}
               alt={flagSources[vehicleDetails.nation].alt || 'Flag'}
               title={flagSources[vehicleDetails.nation].alt}
               width={75}
               height={75}
            />
            <Image
               src={getIcon(vehicleDetails.type || '')}
               title={vehicleDetails.type}
               width={32}
               height={32}
               alt={vehicleDetails.tankDetails?.short_name || 'Tank'}
            />
            <Typography variant='h3' className='text-4xl font-semibold tracking-wide'>
               {tiers[vehicleDetails.tier - 1]}
            </Typography>
            <Typography variant='h3' className='text-4xl font-semibold tracking-wide'>
               {vehicleDetails.tankDetails?.short_name}
            </Typography>
         </div>
         <Typography variant='body1' className=''>
            {vehicleDetails.tankDetails?.description}
         </Typography>
         <PlaceholderImg tank_name={tank_name} />
         <Image
            className='absolute bottom-0 lg:top-0 left-0 object-cover -z-10'
            src={hangar.src}
            alt={'Hangar background'}
            width={1920}
            height={900}
         />
      </header>
   )
}

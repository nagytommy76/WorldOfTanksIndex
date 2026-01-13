import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'
import Image from 'next/image'

import type { VehicleRoles } from '@Types/types'
import type { ITankData } from '@/types/VehicleDetails/Vehicle'

import hangar from '@/Imageshangar-bg.webp'

import Typography from '@mui/material/Typography'

import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import tiers from '@/lib/tierList'

import PlaceholderImg from './PlaceholderImg'
import VehicleRole from './VehicleRoles'

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
         'tags',
      ])

      return vehicleDetails as Pick<ITankData, 'tankDetails' | 'type' | 'tier' | 'nation' | 'tags'>
   } catch (error) {
      console.log(error)
   }
}

export default async function Header({ tank_name, tank_id }: { tank_name: string; tank_id: string }) {
   const vehicleDetails = await getHeaderData(tank_name, tank_id)
   if (!vehicleDetails) return null

   return (
      <header className='min-h-[460px] relative lg:min-h-[750px] max-w-screen'>
         <div className='flex flex-row items-center gap-3'>
            <Image
               src={flagSources[vehicleDetails.nation].source || ''}
               alt={flagSources[vehicleDetails.nation].alt || 'Flag'}
               title={flagSources[vehicleDetails.nation].alt}
               width={75}
               height={75}
            />
            <VehicleRole vehicleRole={vehicleDetails.tags[1] as VehicleRoles} />
            <Typography variant='h2' className='text-4xl font-semibold tracking-wide'>
               {tiers[vehicleDetails.tier - 1]}
            </Typography>
            <Typography variant='h2' className='text-4xl font-semibold tracking-wide'>
               {vehicleDetails.tankDetails?.short_name}
            </Typography>
         </div>
         <div className='w-[400px] h-[400px] absolute top-5 right-5'>
            <Typography variant='h5' gutterBottom>
               Description
            </Typography>
            <Typography variant='body2' className='elipsis tracking-wider'>
               {vehicleDetails.tankDetails?.description}
            </Typography>
         </div>
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

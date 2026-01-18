import Image from 'next/image'
import MECHANIC_NAMES from '@/src/helpers/mechanicNames'

import Typography from '@mui/material/Typography'

export default function VehicleMechanic({ vehicleMechanic }: { vehicleMechanic: unknown }) {
   if (!vehicleMechanic) return null
   const mechanicName = Object.keys(vehicleMechanic).find((name) => name !== 'mechanics')
   if (!mechanicName) return null

   return (
      <div className='w-[500px] mt-4 flex flex-row items-center gap-2 '>
         <div className='w-[160px] h-[100px] relative'>
            <Image
               src={`/icons/mechanics/x128x128/${mechanicName === 'reactiveDebuffs' ? 'overheatGun' : mechanicName}.png`}
               alt={MECHANIC_NAMES[mechanicName]}
               title={MECHANIC_NAMES[mechanicName]}
               width={95}
               height={95}
               className='absolute top-0 left-4 z-2'
            />
            <Image
               src={`/dust_small.png`}
               alt={'Dust particles image'}
               width={200}
               height={200}
               className='absolute -top-15 -left-3 z-1 w-[200px] h-[200px] object-cover'
            />
            <Image
               src={`/glow_front_small.png`}
               alt={'Glow particles image'}
               width={300}
               height={300}
               className='absolute -top-23 -left-2 z-1  w-[280px] h-[280px] object-cover'
            />
         </div>
         <Typography variant='h5'>{MECHANIC_NAMES[mechanicName]}</Typography>
      </div>
   )
}

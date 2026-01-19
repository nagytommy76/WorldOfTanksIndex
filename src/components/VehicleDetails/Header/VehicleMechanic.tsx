'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MECHANIC_NAMES from '@/src/helpers/mechanicNames'

import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

function DisplayMechanic({ mechanicName }: { mechanicName: string }) {
   return (
      <div className='w-[500px] mt-4 flex flex-row items-center gap-2 '>
         <Tooltip title={<Typography variant='body2'>{MECHANIC_NAMES[mechanicName].description}</Typography>}>
            <div className='w-[160px] h-[100px] relative'>
               <Image
                  src={`/icons/mechanics/x128x128/${mechanicName === 'reactiveDebuffs' ? 'overheatGun' : mechanicName}.png`}
                  alt={MECHANIC_NAMES[mechanicName].name}
                  title={MECHANIC_NAMES[mechanicName].name}
                  width={95}
                  height={95}
                  className='absolute top-0 left-4 z-2'
               />
               <Image
                  src={`/dust_small.png`}
                  alt={'Dust particles image'}
                  width={200}
                  height={200}
                  className='absolute -top-15 -left-3 -z-1 w-[200px] h-[200px] object-cover'
               />
               <Image
                  src={`/glow_front_small.png`}
                  alt={'Glow particles image'}
                  width={300}
                  height={300}
                  className='absolute -top-23 -left-2 -z-1  w-[280px] h-[280px] object-cover'
               />
            </div>
         </Tooltip>
         <Typography variant='h5'>{MECHANIC_NAMES[mechanicName].name}</Typography>
      </div>
   )
}

export default function VehicleMechanic({ vehicleMechanic }: { vehicleMechanic: unknown }) {
   const pathname = usePathname().split('/')[2]

   switch (pathname) {
      case 'G187_Taschenratte':
         return <DisplayMechanic mechanicName={'supportWeapon'} />
      case 'F136_AMX_67_Imbattable':
         return <DisplayMechanic mechanicName={'extraShotClip'} />
      case 'F135_AS_XX_40_t':
         return <DisplayMechanic mechanicName={'stationaryReload'} />
      case 'J52_STK_2':
         return <DisplayMechanic mechanicName={'heatingZonesGun'} />
      case 'A179_Black_Rock':
         return <DisplayMechanic mechanicName={'chargeableBurst'} />
      default:
         break
   }
   if (!vehicleMechanic) return null
   const mechanicName = Object.keys(vehicleMechanic).find((name) => name !== 'mechanics')
   if (!mechanicName) return null

   return <DisplayMechanic mechanicName={mechanicName} />
}

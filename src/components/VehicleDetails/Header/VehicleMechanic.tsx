'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MECHANIC_NAMES from '@/src/helpers/mechanicNames'

import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

function DisplayMechanic({ mechanicName }: { mechanicName: string }) {
   return (
      <div className='w-screen h-[100px] mt-4 flex flex-row items-center gap-2 xl:w-[500px]'>
         <Tooltip title={<Typography variant='body2'>{MECHANIC_NAMES[mechanicName].description}</Typography>}>
            <div className='w-[100px] h-[50px] relative xl:w-[160px] xl:h-[80px]'>
               <Image
                  src={`/icons/mechanics/x128x128/${mechanicName === 'reactiveDebuffs' ? 'overheatGun' : mechanicName}.png`}
                  alt={MECHANIC_NAMES[mechanicName].name}
                  title={MECHANIC_NAMES[mechanicName].name}
                  width={95}
                  height={95}
                  className='absolute z-2 -top-4 left-0
                  xl:top-0 xl:left-4'
               />
               <Image
                  src={`/dust_small.png`}
                  alt={'Dust particles image'}
                  width={200}
                  height={200}
                  className='
                  absolute -z-1 object-cover w-[170px] h-[170px] -top-15 -left-0
                  xl:-top-15 xl:-left-3 xl:w-[200px] xl:h-[200px]
                  '
               />
               <Image
                  src={`/glow_front_small.png`}
                  alt={'Glow particles image'}
                  width={300}
                  height={300}
                  className='absolute object-cover -z-1 w-[210px] h-[210px] -top-18 -left-0
                  xl:-top-23 xl:-left-2 xl:w-[280px] xl:h-[280px] '
               />
            </div>
         </Tooltip>
         <Typography variant='h5' className='text-xl xl:text-2xl'>
            {MECHANIC_NAMES[mechanicName].name}
         </Typography>
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
      case 'GB147_FV4025_Contriver':
         return <DisplayMechanic mechanicName={'twinGun'} />
      default:
         break
   }
   if (!vehicleMechanic) return null
   const mechanicName = Object.keys(vehicleMechanic).find((name) => name !== 'mechanics')
   if (!mechanicName) return null

   return <DisplayMechanic mechanicName={mechanicName} />
}

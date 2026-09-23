'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MECHANIC_NAMES, { type MechanicNameKey } from '@/src/helpers/mechanicNames'
import HtmlTooltip from '@/helpers/HtmlTooltip'

import Typography from '@mui/material/Typography'

function DisplayMechanic({
   mechanicName,
   vehicleName,
}: {
   mechanicName: MechanicNameKey
   vehicleName: string
}) {
   return (
      <div className='w-screen h-[100px] mt-4 flex flex-row items-center gap-2 xl:w-[500px]'>
         <HtmlTooltip
            describeChild
            title={
               <div className='w-[300px] bg-neutral-900 p-0'>
                  <Image
                     src={`/MechanicImages/${vehicleName}.png`}
                     alt='mechanic image'
                     width={300}
                     height={160}
                  />
                  <Typography className='p-3' variant='body1'>
                     {MECHANIC_NAMES[mechanicName].description}
                  </Typography>
               </div>
            }
         >
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
         </HtmlTooltip>
         <Typography variant='h6' className='text-xl xl:text-2xl font-semibold'>
            {MECHANIC_NAMES[mechanicName].name}
         </Typography>
      </div>
   )
}

export default function VehicleMechanic({ vehicleMechanic }: { vehicleMechanic: unknown }) {
   const pathname = usePathname().split('/')[2]
   /**
    * @description Vehicles that doesn't have mechanic names
    */
   switch (pathname) {
      case 'G187_Taschenratte':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'supportWeapon'} />
      case 'F136_AMX_67_Imbattable':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'extraShotClip'} />
      case 'F143_Fauteur':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'propellantAfterburnerGun'} />
      case 'F135_AS_XX_40_t':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'stationaryReload'} />
      case 'J52_STK_2':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'heatingZonesGun'} />
      case 'J53_Ho_Ri_Shugo':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'auxiliaryRocketLauncher'} />
      case 'A179_Black_Rock':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'chargeableBurst'} />
      case 'GB147_FV4025_Contriver':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'twinGun'} />
      case 'A195_Gorilla':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'lowChargeShot'} />
      case 'Cz46_Vz_63P':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'shellCalibration'} />
      case 'G193_Pz_Kpfw_55':
      case 'G195_HWK_40':
      case 'G196_Versuchspanzer_57':
      case 'G197_Pz_Kpfw_Neu':
      case 'G198_Kampfpanzer_67':
         return <DisplayMechanic vehicleName={pathname} mechanicName={'shellParamsSwitcher'} />
      default:
         break
   }
   if (!vehicleMechanic) return null
   const mechanicName = Object.keys(vehicleMechanic).find((name) => name !== 'mechanics') as MechanicNameKey
   if (!mechanicName) return null

   return <DisplayMechanic vehicleName={pathname} mechanicName={mechanicName} />
}

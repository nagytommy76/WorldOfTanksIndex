import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { returnClipReloadTime, returnDPM, returnAutoReloadDPM } from './helper'

import TableRowComponent from '../../Includes/TableRow'
import Typography from '@mui/material/Typography'

export default function AvgDpm({
   clipDamage,
   reloadBetweenShells,
   totalReloadTime,
}: {
   clipDamage: number
   reloadBetweenShells: number
   totalReloadTime: number
}) {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun, shells },
      },
   } = useContext(VehicleContext)

   const clip = vehicleGun[selectedModuleNames.vehicleGun]?.clip
   const autoreload = vehicleGun[selectedModuleNames.vehicleGun]?.autoreload

   switch (true) {
      case autoreload && clip !== null:
         return (
            <>
               <TableRowComponent
                  iconSrc='/icons/firepower/avgDamagePerMinute.png'
                  titleText='Average Damage per Minute'
                  valueText={(
                     ((shells[selectedModuleNames.shells]?.damage.armor as number) /
                        autoreload.reloadTime[autoreload.reloadTime.length - 1]) *
                     60
                  ).toFixed(0)}
                  unit='HP/min'
                  TooltipTitle={
                     <>
                        <Typography variant='caption'>
                           The Avarage Damage value when you only fire the first shell of the clip.
                        </Typography>
                        <Typography variant='caption'>
                           The damage of the gun is divided by the reload time of the last shell.
                        </Typography>
                        <Typography variant='caption'>
                           The value is then multiplied by 60 to get the damage per minute.
                        </Typography>
                     </>
                  }
               />
               <TableRowComponent
                  iconSrc='/icons/firepower/avgDamagePerMinute.png'
                  titleText='Continuous Autoreloader DPM'
                  valueText={returnAutoReloadDPM(autoreload, clipDamage).toFixed(0)}
                  unit='HP/min'
                  TooltipTitle={
                     <>
                        <Typography variant='caption'>
                           Autoreloaders are designed to not be fully dumped. In steady-state play, you are
                           effectively consuming shells as they regenerate.
                        </Typography>
                        <Typography variant='body1'>
                           Total damage generated per full reload cycle:{' '}
                        </Typography>
                        <Typography variant='body2'>
                           {clipDamage} damage every {totalReloadTime} seconds
                        </Typography>
                     </>
                  }
               />
            </>
         )
      case clip !== null:
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={returnClipReloadTime(
                  vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime,
                  clip,
                  clipDamage,
                  reloadBetweenShells,
               ).toFixed(0)}
               unit='HP/min'
            />
         )
      case Array.isArray(shells[selectedModuleNames.shells]?.damage.armor):
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={returnDPM(
                  vehicleGun[selectedModuleNames.vehicleGun].reloadTime,
                  (shells[selectedModuleNames.shells]?.damage.armor as number[])[0],
               ).toFixed(0)}
               unit='HP/min'
            />
         )

      default:
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={returnDPM(
                  vehicleGun[selectedModuleNames.vehicleGun].reloadTime,
                  shells[selectedModuleNames.shells]?.damage.armor as number,
               ).toFixed(0)}
               unit='HP/min'
            />
         )
   }
}

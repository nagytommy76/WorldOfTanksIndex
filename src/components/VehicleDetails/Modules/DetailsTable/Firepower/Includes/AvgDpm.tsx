import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { returnClipReloadTime, returnDPM, returnAutoReloadDPM } from './helper'

import TableRowComponent from '../../Includes/TableRow'

export default function AvgDpm({
   clipDamage,
   reloadBetweenShells,
}: {
   clipDamage: number
   reloadBetweenShells: number
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
      case autoreload !== null && clip !== null:
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={returnAutoReloadDPM(
                  autoreload,
                  clipDamage,
                  shells[selectedModuleNames.shells]?.damage.armor
               ).toFixed(0)}
               unit='HP/min'
            />
         )
      case clip !== null:
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/avgDamagePerMinute.png'
               titleText='Average Damage per Minute'
               valueText={returnClipReloadTime(
                  vehicleGun[selectedModuleNames.vehicleGun].reloadTime,
                  clip,
                  clipDamage,
                  reloadBetweenShells
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
                  shells[selectedModuleNames.shells]?.damage.armor
               ).toFixed(0)}
               unit='HP/min'
            />
         )
   }
}

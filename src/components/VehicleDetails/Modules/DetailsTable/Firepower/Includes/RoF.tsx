import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'

export default function RoF({ totalReloadTime }: { totalReloadTime: number }) {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun },
      },
   } = useContext(VehicleContext)

   const selectedGun = vehicleGun[selectedModuleNames.vehicleGun]
   if (!selectedGun) return null

   switch (true) {
      case selectedGun.clip !== null && selectedGun.autoreload !== null:
         const autoReload = selectedGun.autoreload
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTime.png'
               titleText='Rate of Fire'
               valueText={((1 / autoReload?.reloadTime[0]) * 60).toFixed(2)}
               unit='rounds/min'
            />
         )
      case selectedGun.clip !== null:
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTime.png'
               titleText='Rate of Fire'
               valueText={((60 / totalReloadTime) * (selectedGun.clip?.count as number)).toFixed(2)}
               unit='rounds/min'
            />
         )
      default:
         return (
            <TableRowComponent
               iconSrc='/icons/firepower/reloadTime.png'
               titleText='Rate of Fire'
               valueText={(60 / selectedGun.reloadTime).toFixed(2)}
               unit='rounds/min'
            />
         )
   }
}

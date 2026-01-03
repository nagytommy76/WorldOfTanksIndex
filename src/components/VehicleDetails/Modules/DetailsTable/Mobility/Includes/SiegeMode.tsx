import type { ISiegeMode } from '@/types/VehicleDetails/Other'
import TableRowComponent from '../../Includes/TableRow'

export default function SiegeMode({ siegeMode }: { siegeMode: Partial<ISiegeMode> }) {
   console.log(siegeMode)
   if (siegeMode.switchOffTime === 0 || siegeMode.switchOffTime === '0') {
      return (
         <>
            <TableRowComponent
               iconSrc='/icons/mobility/switchOnTime.png'
               titleText='Speed Limit Switching to Siege Mode'
               valueText={siegeMode.autoSwitchOnRequiredVehicleSpeed || 0}
               unit='km/h'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/switchOnTime.png'
               titleText='Speed Limit Switching to exit Siege Mode'
               valueText={siegeMode.autoSwitchOffRequiredVehicleSpeed || 0}
               unit='km/h'
            />
         </>
      )
   } else {
      return (
         <>
            <TableRowComponent
               iconSrc='/icons/mobility/switchOnTime.png'
               titleText='Switching to Siege Mode'
               valueText={siegeMode.switchOnTime || 0}
               unit='s'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/switchOffTime.png'
               titleText='Switching to Travel Mode'
               valueText={siegeMode.switchOffTime || 0}
               unit='s'
            />
         </>
      )
   }
}

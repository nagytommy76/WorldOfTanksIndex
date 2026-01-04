import type { IDualAccuracy } from '@/types/VehicleDetails/Guns'
import TableRowComponent from '../../Includes/TableRow'

export default function DualAccuracy({
   dualAccuracy,
   reloadTime,
}: {
   dualAccuracy: IDualAccuracy
   reloadTime: number
}) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/firepower/shotDispersionAngle.png'
            titleText='Pre-Cooldown Dispersion'
            valueText={dualAccuracy.afterShotDispersionRadius}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/dualAccuracyCoolingDelay.png'
            titleText='Gun Cooling Time'
            valueText={dualAccuracy.coolingDelay}
            unit='s'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/dualAccuracyCoolingDelay.png'
            titleText='Gun Cooling Time After Reload'
            valueText={(dualAccuracy.coolingDelay - reloadTime).toFixed(2)}
            unit='s'
            paddingLeft
         />
      </>
   )
}

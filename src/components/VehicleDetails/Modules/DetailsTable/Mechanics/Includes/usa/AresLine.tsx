import TableRowComponent from '../../../Includes/TableRow'
import type { AresLineMechanics } from '../../Types'

export default function AresLine({ mechanics }: { mechanics: AresLineMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/ares/coolingDelay.png'
            titleText='Cooling Delay'
            valueText={mechanics.mechanics.coolingDelay}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/ares/timeToOverheat.png'
            titleText='Continous Fire Before Overheat'
            valueText={mechanics.mechanics.timeToOverheat}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/ares/overheatDuration.png'
            titleText='Overheated Gun Cooling Time'
            valueText={mechanics.mechanics.overheatDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/ares/coolingDelay.png'
            titleText='Fully Heated Gun Cooling Time'
            valueText={mechanics.mechanics.coolingTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/ares/heatingPerShot.png'
            titleText='Heat Per Shot'
            valueText={mechanics.mechanics.heatingPerShot}
            unit=''
         />
      </>
   )
}

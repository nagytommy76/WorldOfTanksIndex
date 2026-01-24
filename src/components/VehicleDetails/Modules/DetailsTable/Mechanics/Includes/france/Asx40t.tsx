import TableRowComponent from '../../../Includes/TableRow'
import type { Asx40TMechanics } from '../../Types'

export default function Asx40t({ mechanics }: { mechanics: Asx40TMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/stationaryReloadSwitchOnTime.png'
            titleText='Reload Activation'
            valueText={mechanics.mechanics.stationaryReloadSwitchOnTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/stationaryReloadSwitchOffTime.png'
            titleText='Reload Interruption'
            valueText={mechanics.mechanics.stationaryReloadSwitchOffTime}
            unit='seconds'
         />
      </>
   )
}

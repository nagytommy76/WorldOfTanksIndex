import TableRowComponent from '../../../Includes/TableRow'
import type { NeuLineMechanics } from '../../Types'

export default function Neu({ mechanics }: { mechanics: NeuLineMechanics }) {
   return (
      <TableRowComponent
         iconSrc='/icons/mechanics/borken/designatorInitialCooldownS.png'
         titleText='Time To Switch Modes'
         valueText={mechanics.mechanics.shellParamsSwitchingTime}
         unit='seconds'
      />
   )
}

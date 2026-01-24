import TableRowComponent from '../../../Includes/TableRow'
import type { ImbattableMechanics } from '../../Types'

export default function Imbattable({ mechanics }: { mechanics: ImbattableMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/extraShotClipReloadTime.png'
            titleText='Penalty To Reload'
            valueText={mechanics.mechanics.extraShotClipReloadTime}
            unit='seconds'
         />
      </>
   )
}

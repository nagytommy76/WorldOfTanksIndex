import TableRowComponent from '../../../Includes/TableRow'
import type { Vz63PMechanics } from '../../Types'

export default function Vz63P({ mechanics }: { mechanics: Vz63PMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/vz63p/shellCalibrationAvgDamage.png'
            titleText='Adjusted Shell Average Damage'
            valueText={mechanics.mechanics.shellCalibrationAvgDamage}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/vz63p/shellCalibrationAvgPenetration.png'
            titleText='Adjusted Shell Average Penetration'
            valueText={mechanics.mechanics.shellCalibrationAvgPenetration}
            unit=''
         />
      </>
   )
}

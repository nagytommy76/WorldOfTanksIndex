import TableRowComponent from '../../Includes/TableRow'
import type { BorkenkaferMechanics } from '../Types'

export default function Borkenkafer({ mechanics }: { mechanics: BorkenkaferMechanics }) {
   const preheatDispersionCap = Number(
      mechanics.mechanics.designatorMarkedEnemiesAdditionalDamage.split('%')[0]
   )

   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorInitialCooldownS.png'
            titleText='Initial Cooldown'
            valueText={mechanics.mechanics.designatorInitialCooldownS}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorCooldownS.png'
            titleText='Cooldown'
            valueText={mechanics.mechanics.designatorCooldownS}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorMarkdurationS.png'
            titleText='Mark duration'
            valueText={mechanics.mechanics.designatorMarkDurationS}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorMarkedEnemiesAdditionalDamage.png'
            titleText='Additional marked damage'
            valueText={preheatDispersionCap}
            unit='%'
         />
      </>
   )
}

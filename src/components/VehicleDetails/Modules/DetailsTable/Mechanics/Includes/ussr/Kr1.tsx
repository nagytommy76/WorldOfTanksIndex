import TableRowComponent from '../../../Includes/TableRow'
import type { Kr1Mechanics } from '../../Types'

export default function Kr1({ mechanics }: { mechanics: Kr1Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/kr1/damageEnemiesByRamming.png'
            titleText='Ramming dmg caused'
            valueText={mechanics.mechanics.improvedDamageEnemiesByRamming}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/kr1/damageEnemiesChassisByRamming.png'
            titleText='Ramming dmg caused to suspension'
            valueText={mechanics.mechanics.improvedDamageEnemiesChassisByRamming}
            unit=''
         />
      </>
   )
}

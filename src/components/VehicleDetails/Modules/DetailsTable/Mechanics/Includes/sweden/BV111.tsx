import TableRowComponent from '../../../Includes/TableRow'
import type { Bv111Mechanics } from '../../Types'

export default function BV111({ mechanics }: { mechanics: Bv111Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/bv111/bustleFeedDamagePerShot.png'
            titleText='Average Damage'
            valueText={mechanics.mechanics.bustleFeedDamagePerShot}
            unit='HP'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bv111/bustleFeedRateOfFire.png'
            titleText='Rate of Fire'
            valueText={mechanics.mechanics.bustleFeedRateOfFire}
            unit='HP'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bv111/bustleFeedMaxSpeed.png'
            titleText='Top Speed (EAF mode)'
            valueText={mechanics.mechanics.bustleFeedMaxSpeed}
            unit='km/s'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bv111/bustleFeedSwitchingToEASMMode.png'
            titleText='EAF Mode Activation'
            valueText={mechanics.mechanics.bustleFeedSwitchingToEASMMode}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bv111/bustleFeedSwitchingToStandardMode.png'
            titleText='EAF Mode Deactivation'
            valueText={mechanics.mechanics.bustleFeedSwitchingToStandardMode}
            unit='seconds'
         />
      </>
   )
}

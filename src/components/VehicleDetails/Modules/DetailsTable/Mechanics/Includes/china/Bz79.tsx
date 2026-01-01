import TableRowComponent from '../../../Includes/TableRow'
import type { Bz79Mechanics } from '../../Types'

export default function Bz79({ mechanics }: { mechanics: Bz79Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/enginePowerWithBoosters.png'
            titleText='Engine Power (boosters)'
            valueText={mechanics.mechanics.enginePowerWithBoosters}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/topSpeedWithBoosters.png'
            titleText='Top Speed (boosters)'
            valueText={mechanics.mechanics.topSpeedWithBoosters}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/reverseSpeedReductionWithBoosters.png'
            titleText='Reverse Speed Reduction'
            valueText={mechanics.mechanics.reverseSpeedReductionWithBoosters}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/traverseSpeedReductionWithBoosters.png'
            titleText='Traverse Speed Reduction'
            valueText={mechanics.mechanics.traverseSpeedReductionWithBoosters}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/boosterDuration.png'
            titleText='Booster Duration'
            valueText={mechanics.mechanics.boosterDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/boosterCoolingTime.png'
            titleText='Booster Cooling Time'
            valueText={mechanics.mechanics.boosterCoolingTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/reactivationLimit.png'
            titleText='Reactivation Limit'
            valueText={mechanics.mechanics.reactivationLimit}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/bz79/reactivationDelay.png'
            titleText='Reactivation Delay'
            valueText={mechanics.mechanics.reactivationDelay}
            unit='seconds'
         />
      </>
   )
}

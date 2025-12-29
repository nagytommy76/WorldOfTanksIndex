import TableRowComponent from '../../Includes/TableRow'
import type { Leo120Mechanics } from '../Types'

export default function Leo120({ mechanics }: { mechanics: Leo120Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/leo/accuracyDispersionPerLevel.png'
            titleText='Dispersion / level'
            valueText={mechanics.mechanics.accuracyDispersionPerLevel}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/leo/accuracyDispersionCap.png'
            titleText='Dispersion at max level'
            valueText={mechanics.mechanics.accuracyDispersionCap}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/leo/accuracyWhileMovingDispersionCap.png'
            titleText='Accuracy while moving'
            valueText={mechanics.mechanics.accuracyWhileMovingDispersionCap}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/leo/furyMaxReloadEfficiencyLevel.png'
            titleText='Max accuracy level'
            valueText={mechanics.accuracyStacks.levelMax}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/preheatSpeedLimit.png'
            titleText='Speed limit'
            valueText={mechanics.accuracyStacks.gainMaxSpd}
            unit='km/h'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hirsch/preheatSpeedLimit.png'
            titleText='Time per level'
            valueText={mechanics.accuracyStacks.gainTime}
            unit='seconds'
         />
      </>
   )
}

import TableRowComponent from '../../../Includes/TableRow'
import type { BreakerMechanics } from '../../Types'

export default function Breaker({ mechanics }: { mechanics: BreakerMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mobility/enginePower.png'
            titleText='Engine Power'
            valueText={mechanics.mechanics.enginePower}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/speedLimits.png'
            titleText='Top Speed'
            valueText={mechanics.mechanics.forwardMaxSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/chassisRotationSpeed.png'
            titleText='Traversing Speed'
            valueText={mechanics.mechanics.chassisRotationSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/breaker/powerModeThreshold.png'
            titleText='Mode activation'
            valueText={mechanics.mechanics.powerModeThreshold}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/breaker/powerModeDuration.png'
            titleText='Power mode duration'
            valueText={mechanics.mechanics.powerModeDuration}
            unit='seconds'
         />
      </>
   )
}

import TableRowComponent from '../../../Includes/TableRow'
import type { Strv107Mechanics } from '../../Types'

export default function strv107({ mechanics }: { mechanics: Strv107Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/firepower/reloadTimeSecs.png'
            titleText='Reload Time'
            valueText={mechanics.mechanics.reloadTimeSecs}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/firepower/shotDispersionAngle.png'
            titleText='Dispersion at 100 m'
            valueText={mechanics.mechanics.shotDispersionAngle}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/speedLimits.png'
            titleText='Top Speed/Reverse Speed'
            valueText={mechanics.mechanics.speedLimits}
            unit='km/h'
         />
         <TableRowComponent
            iconSrc='/icons/mobility/chassisRotationSpeed.png'
            titleText='Horizontal Traverse Speed'
            valueText={mechanics.mechanics.pillboxHorizontalRotationSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/pillboxVerticalRotationSpeed.png'
            titleText='Vertical Traverse Speed'
            valueText={mechanics.mechanics.pillboxHorizontalRotationSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/pillboxSwitchOnTime.png'
            titleText='Switch to Pillbox Mode'
            valueText={mechanics.mechanics.pillboxSwitchOnTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mobility/pillboxSwitchOffTime.png'
            titleText='Switch to Travel Mode'
            valueText={mechanics.mechanics.pillboxSwitchOffTime}
            unit='seconds'
         />
      </>
   )
}

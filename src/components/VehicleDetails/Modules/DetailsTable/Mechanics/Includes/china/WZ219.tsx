import TableRowComponent from '../../../Includes/TableRow'
import type { Wz219Mechanics } from '../../Types'

export default function WZ219({ mechanics }: { mechanics: Wz219Mechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerDeployTime.png'
            titleText='Initial Cooldown'
            valueText={mechanics.mechanics.sightPointerDeployTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerReloadTime.png'
            titleText='Cooldown'
            valueText={mechanics.mechanics.sightPointerReloadTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerDuration.png'
            titleText='Duration'
            valueText={mechanics.mechanics.sightPointerDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerRotationSpeed.png'
            titleText='Turret Traverse Speed'
            valueText={mechanics.mechanics.sightPointerRotationSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerSectorAngleStart.png'
            titleText='Initial Scan Width'
            valueText={mechanics.mechanics.sightPointerSectorAngleStart}
            unit='deg'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerSectorAngleEnd.png'
            titleText='Final Scan Width'
            valueText={mechanics.mechanics.sightPointerSectorAngleEnd}
            unit='deg'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerSelfSpottingTime.png'
            titleText='Self-Spotting Duration'
            valueText={mechanics.mechanics.sightPointerSelfSpottingTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerViewRange.png'
            titleText='View Range'
            valueText={mechanics.mechanics.sightPointerViewRange}
            unit='m'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerConsealmentFoliage.png'
            titleText='Enemy Concealment Behind Foliage (Stationary and Moving)'
            valueText={mechanics.mechanics.sightPointerConsealmentFoliage}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/wz219/sightPointerConsealmentMoving.png'
            titleText='Moving Enemy Concealment'
            valueText={mechanics.mechanics.sightPointerConsealmentMoving}
            unit=''
         />
      </>
   )
}

import TableRowComponent from '../../../Includes/TableRow'
import type { HoriShugoMechanics } from '../../Types'

export default function HoRiShugo({ mechanics }: { mechanics: HoriShugoMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/shugo/auxiliaryRocketLauncherReloadTime.png'
            titleText='Cooldown'
            valueText={mechanics.mechanics.auxiliaryRocketLauncherReloadTime}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/shugo/auxiliaryRocketLauncherAvgDamage.png'
            titleText='Average Damage'
            valueText={mechanics.mechanics.auxiliaryRocketLauncherAvgDamage}
            unit='HP'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/shugo/auxiliaryRocketLauncherPenetration.png'
            titleText='Average Penetration'
            valueText={mechanics.mechanics.auxiliaryRocketLauncherPenetration}
            unit='mm'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/shugo/auxiliaryRocketLauncherVelocity.png'
            titleText='Rocket Shell Velocity'
            valueText={mechanics.mechanics.auxiliaryRocketLauncherVelocity}
            unit='m/s'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/shugo/auxiliaryRocketLauncherDispersion.png'
            titleText='Dispersion at 100m'
            valueText={mechanics.mechanics.auxiliaryRocketLauncherDispersion}
            unit='m'
         />
      </>
   )
}

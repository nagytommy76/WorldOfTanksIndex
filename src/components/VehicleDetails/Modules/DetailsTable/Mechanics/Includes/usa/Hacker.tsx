import TableRowComponent from '../../../Includes/TableRow'
import type { HackerMechanics } from '../../Types'

export default function Hacker({ mechanics }: { mechanics: HackerMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/hacker/concentrationModeCooldown.png'
            titleText='Cooldown'
            valueText={mechanics.mechanics.concentrationModeCooldown}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hacker/concentrationModeDuration.png'
            titleText='Duration'
            valueText={mechanics.mechanics.concentrationModeDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hacker/vehicleGunShotDispersionChassisMovement.png'
            titleText='To dipersion during movement'
            valueText={mechanics.mechanics.vehicleGunShotDispersionChassisMovement}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hacker/vehicleGunShotDispersionChassisRotation.png'
            titleText='To dipersion during hull traverse'
            valueText={mechanics.mechanics.vehicleGunShotDispersionChassisRotation}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/hacker/vehicleGunShotDispersionTurretRotation.png'
            titleText='To dipersion during gun traverse'
            valueText={mechanics.mechanics.vehicleGunShotDispersionTurretRotation}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/firepower/shotDispersionAngle.png'
            titleText='Dispersion at 100m'
            valueText={mechanics.mechanics.shotDispersionAngle}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/chassisRotationSpeed.png'
            titleText='Traverse speed'
            valueText={mechanics.mechanics.chassisRotationSpeed}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mobility/enginePower.png'
            titleText='Engine power'
            valueText={mechanics.mechanics.enginePower}
            unit=''
         />
      </>
   )
}

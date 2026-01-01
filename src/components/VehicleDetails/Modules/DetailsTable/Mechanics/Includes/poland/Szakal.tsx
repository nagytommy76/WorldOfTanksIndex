import TableRowComponent from '../../../Includes/TableRow'
import type { SzakalMechanics } from '../../Types'

export default function Szakal({ mechanics }: { mechanics: SzakalMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/passiveCoincideceShootingCharge.png'
            titleText='Coincidece Electrromechanical Charge (% / sec)'
            valueText={mechanics.mechanics.passiveCoincideceShootingCharge}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/activeCoincideceShootingCharge.png'
            titleText='Coincidece Electrromechanical Charge (% / hit)'
            valueText={mechanics.mechanics.activeCoincideceShootingCharge}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/coincidenceElectromechanicalSightDuration.png'
            titleText='Coincidece Electrromechanical Duration'
            valueText={mechanics.mechanics.coincidenceElectromechanicalSightDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/aimingTimeCoincidenceElectromechanicalSight.png'
            titleText='Aiming Time'
            valueText={mechanics.mechanics.aimingTimeCoincidenceElectromechanicalSight}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/dispersionAt100mCoincidenceElectromechanicalSight.png'
            titleText='Dispersion at 100 m'
            valueText={mechanics.mechanics.dispersionAt100mCoincidenceElectromechanicalSight}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/reloadTimeCoincidence.png'
            titleText='Reload Time'
            valueText={mechanics.mechanics.reloadTimeCoincidence}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/switchEngineModeBothModes.png'
            titleText='Time to switch engine modes'
            valueText={mechanics.mechanics.switchEngineModeBothModes}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/switchEngineModeBothModes.png'
            titleText='Top Speed/Reverse Speed'
            valueText={mechanics.mechanics.ionAfterburnerDurationSpeedCap}
            unit='km/h'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/ionAfterburnerDurationEnginePower.png'
            titleText='Engine Power'
            valueText={mechanics.mechanics.ionAfterburnerDurationEnginePower}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/aimingTimeTurbo.png'
            titleText='Aiming Time (Turbo Mode)'
            valueText={mechanics.mechanics.aimingTimeTurbo}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/movementTraverseDispersionTurbo.png'
            titleText='Dispersion During Movement (Turbo Mode)'
            valueText={mechanics.mechanics.movementTraverseDispersionTurbo}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/hullTraverseDispersionTurbo.png'
            titleText='Dispersion During Hull Traverse (Turbo Mode)'
            valueText={mechanics.mechanics.hullTraverseDispersionTurbo}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/gunTraverseDispersionTurbo.png'
            titleText='Dispersion During Gun Traverse (Turbo Mode)'
            valueText={mechanics.mechanics.gunTraverseDispersionTurbo}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/ionAfterburnerPassiveTurboCharge.png'
            titleText='Ion-Discharge, Afterburner Charge (%/sec) (Turbo->Passive)'
            valueText={mechanics.mechanics.ionAfterburnerPassiveTurboCharge}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/ionAfterburnerActiveTurboCharge.png'
            titleText='Ion-Discharge, Afterburner Charge (%/sec) (Passive->Turbo)'
            valueText={mechanics.mechanics.ionAfterburnerActiveTurboCharge}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/ionAfterburnerDuration.png'
            titleText='Ion-Discharge, Afterburner Duration'
            valueText={mechanics.mechanics.ionAfterburnerDuration}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/turboSpeedCap.png'
            titleText='Top Speed/Reverse Speed (Turbo Mode)'
            valueText={mechanics.mechanics.turboSpeedCap}
            unit='km/h'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/szakal/engineTurboPowerCap.png'
            titleText='Engine Power (Turbo Mode)'
            valueText={mechanics.mechanics.engineTurboPowerCap}
            unit=''
         />
      </>
   )
}

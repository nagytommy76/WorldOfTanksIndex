import TableRowComponent from '../../../Includes/TableRow'
import type { BlackRockMechanics } from '../../Types'

export default function BlackRock({ mechanics }: { mechanics: BlackRockMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/firepower/avgPiercingPower.png'
            titleText='Penetrations to Activate Mode'
            valueText={mechanics.mechanics.chargeableBurstPenetrationCount}
            unit='quantity'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/burstFireRate.png'
            titleText='Shells in Casette'
            valueText={mechanics.mechanics.chargeableBurstSize}
            unit='quantity'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/chargeableBurstReload.png'
            titleText='Burst Mode Reload'
            valueText={mechanics.mechanics.chargeableBurstReload}
            unit='sconds'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
            titleText='Second Shot Dispersion (at 100m)'
            valueText={mechanics.mechanics.chargeableBurstDispersion}
            unit=''
         />
      </>
   )
}

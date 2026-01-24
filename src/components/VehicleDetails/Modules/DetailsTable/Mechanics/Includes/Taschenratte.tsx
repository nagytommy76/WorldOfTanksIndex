import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import TableRowComponent from '../../Includes/TableRow'
import type { TaschenratteMechanics } from '../Types'

export default function Taschenratte({ mechanics }: { mechanics: TaschenratteMechanics }) {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleTurret },
      },
   } = useContext(VehicleContext)
   const secondaryGuns = vehicleTurret[selectedModuleNames.vehicleTurret].secondaryGuns
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/tasch/secondaryReloadTimeSecs.png'
            titleText='Auxiliary weapon reload time'
            valueText={mechanics.mechanics.secondaryReloadTimeSecs}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/tasch/additionalShellAmmoCapacity.png'
            titleText='Auxiliary weapon shells'
            valueText={mechanics.mechanics.secondaryTotalBurstSize}
            unit='shells'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/avgPiercingPower.png'
            titleText='Avg penetration per shell'
            valueText={mechanics.mechanics.secondaryAvgPiercingPower}
            unit='mm'
         />
         <TableRowComponent
            iconSrc='/icons/firepower/avgDamage.png'
            titleText='Avg damage per shell'
            valueText={mechanics.mechanics.secondaryAvgDamage}
            unit='hp'
         />
         {secondaryGuns && (
            <>
               <TableRowComponent
                  iconSrc='/icons/firepower/shellModuleDamage.png'
                  titleText='Module damage'
                  valueText={(secondaryGuns[0].shells[0].damage?.devices as number) || 0}
                  unit='hp'
               />
               <TableRowComponent
                  iconSrc='/icons/firepower/aimingTime.png'
                  titleText='Aiming time'
                  valueText={secondaryGuns[0].aimingTime}
                  unit='seconds'
               />
               <TableRowComponent
                  iconSrc='/icons/firepower/caliber.png'
                  titleText='Caliber'
                  valueText={secondaryGuns[0].shells[0].caliber || 0}
                  unit='mm'
               />
               <TableRowComponent
                  iconSrc='/icons/firepower/vehicleGunShotDispersionTurretRotation.png'
                  titleText='Turret traverse'
                  valueText={'+ ' + secondaryGuns[0].shotDispersionFactors.turretRotation}
                  unit='m'
                  paddingLeft
               />
               <TableRowComponent
                  iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
                  titleText='After firing'
                  valueText={'* ' + secondaryGuns[0].shotDispersionFactors.afterShot}
                  unit=''
                  paddingLeft
               />
               <TableRowComponent
                  iconSrc='/icons/firepower/vehicleGunShotDispersionWhileGunDamaged.png'
                  titleText='While damaged'
                  valueText={'+ ' + secondaryGuns[0].shotDispersionFactors.whileGunDamaged}
                  unit='m'
                  paddingLeft
               />
            </>
         )}
      </>
   )
}

import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import { applyDispersionModifiers } from '../utils/ApplyDispersionModifiers'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function GunDispersions() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun, vehicleChassis },
      },
   } = useContext(VehicleContext)

   const {
      deviceReducer: { appliedDevicesModifiers },
      returnAppliedModifierDiplayValue,
   } = useContext(DeviceContext)

   const vehicleMovementBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement
   const vehicleRotationBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation
   const turretRotationBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation
   const afterShotBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot

   // Grab base values from selected modules

   const baseDispersionValues = useMemo(
      () => ({
         vehicleMovement: vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement,
         vehicleRotation: vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation,
         turretRotation: vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation,
         afterShot: vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot,
      }),
      [selectedModuleNames, vehicleGun, vehicleChassis],
   )

   /**
    * Recomputes dispersion values whenever base values OR applied devices change.
    * No useState/useEffect needed — this is purely derived data.
    * Stacks multiplicatively if multiple devices share the same modifier name.
    */
   const { vehicleMovement, vehicleRotation, turretRotation, afterShot } = useMemo(
      () => applyDispersionModifiers(baseDispersionValues, appliedDevicesModifiers),
      [baseDispersionValues, appliedDevicesModifiers],
   )

   return (
      <>
         <TableRow className='bg-gray-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>Gun Dispersions</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/firepower/shotDispersionAngle.png'
            titleText='Accuracy At 100 m'
            valueText={vehicleGun[selectedModuleNames.vehicleGun].accuracy}
            unit='m'
            paddingLeft
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisMovement.png'
            titleText='Moving'
            valueText={parseFloat(vehicleMovement.toFixed(4))}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((vehicleMovement - vehicleMovementBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisRotation.png'
            titleText='Tank traverse'
            valueText={'+ ' + parseFloat(vehicleRotation.toFixed(4))}
            unit='m'
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', vehicleRotationBase, true)}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionTurretRotation.png'
            titleText='Turret traverse'
            valueText={'+ ' + parseFloat(turretRotation.toFixed(4))}
            unit='m'
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', turretRotationBase, true)}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
            titleText='After firing'
            valueText={'* ' + parseFloat(afterShot.toFixed(4))}
            unit=''
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', afterShotBase, true)}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionWhileGunDamaged.png'
            titleText='While damaged'
            valueText={'+ ' + vehicleGun[selectedModuleNames.vehicleGun].dispersion.whileDamaged}
            unit='m'
            paddingLeft
         />
      </>
   )
}

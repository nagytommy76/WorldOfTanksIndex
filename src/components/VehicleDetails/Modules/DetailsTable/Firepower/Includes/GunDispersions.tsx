import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '../utils/ApplyDispersionModifiers'

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
   } = useContext(DeviceContext)

   const accuracyBase = vehicleGun[selectedModuleNames.vehicleGun].accuracy
   const vehicleMovementBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement
   const vehicleRotationBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation
   const turretRotationBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation
   const afterShotBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot

   // Grab base values from selected modules
   const baseDispersionValues = useMemo(
      () => ({
         accuracy: accuracyBase,
         vehicleMovement: vehicleMovementBase,
         vehicleRotation: vehicleRotationBase,
         turretRotation: turretRotationBase,
         afterShot: afterShotBase,
      }),
      [vehicleMovementBase, vehicleRotationBase, turretRotationBase, afterShotBase, accuracyBase],
   )

   /**
    * Recomputes dispersion values whenever base values OR applied devices change.
    * No useState/useEffect needed — this is purely derived data.
    * Stacks multiplicatively if multiple devices share the same modifier name.
    */
   const { vehicleMovement, vehicleRotation, turretRotation, afterShot, accuracy } = useMemo(
      () => applyModifiersOnVehicleDetails(baseDispersionValues, appliedDevicesModifiers),
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
            valueText={accuracy}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((accuracy - accuracyBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisMovement.png'
            titleText='Moving'
            valueText={vehicleMovement}
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
            valueText={vehicleRotation}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((vehicleRotation - vehicleRotationBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionTurretRotation.png'
            titleText='Turret traverse'
            valueText={turretRotation}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((turretRotation - turretRotationBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
            titleText='After firing'
            valueText={afterShot}
            unit=''
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((afterShot - afterShotBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionWhileGunDamaged.png'
            titleText='While damaged'
            valueText={vehicleGun[selectedModuleNames.vehicleGun].dispersion.whileDamaged}
            unit='m'
            paddingLeft
         />
      </>
   )
}

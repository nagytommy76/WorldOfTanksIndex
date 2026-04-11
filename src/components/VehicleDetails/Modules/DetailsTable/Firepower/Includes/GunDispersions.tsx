import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

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
      setAppliedDeviceModifier,
   } = useContext(DeviceContext)

   const vehicleMovementBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement
   const vehicleRotationBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation
   const turretRotationBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation
   const afterShotBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot

   const [vehicleMovement, setVehicleMovement] = useState(vehicleMovementBase)
   const [vehicleRotation, setVehicleRotation] = useState(vehicleRotationBase)
   const [turretRotation, setTurretRotation] = useState(turretRotationBase)
   const [afterShot, setAfterShot] = useState(afterShotBase)

   useEffect(() => {
      setAppliedDeviceModifier(
         vehicleMovementBase,
         'aimingStabilizer',
         'vehicleGunShotDispersion',
         setVehicleMovement,
      )
      setAppliedDeviceModifier(
         vehicleRotationBase,
         'aimingStabilizer',
         'vehicleGunShotDispersion',
         setVehicleRotation,
      )
      setAppliedDeviceModifier(
         turretRotationBase,
         'aimingStabilizer',
         'vehicleGunShotDispersion',
         setTurretRotation,
      )
      setAppliedDeviceModifier(afterShotBase, 'aimingStabilizer', 'vehicleGunShotDispersion', setAfterShot)
   }, [
      selectedModuleNames,
      appliedDevicesModifiers,
      setAppliedDeviceModifier,
      vehicleMovementBase,
      vehicleRotationBase,
      turretRotationBase,
      afterShotBase,
   ])

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
            valueText={vehicleMovement.toFixed(4)}
            unit='m'
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', vehicleMovementBase, true)}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisRotation.png'
            titleText='Tank traverse'
            valueText={'+ ' + vehicleRotation.toFixed(4)}
            unit='m'
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', vehicleRotationBase, true)}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionTurretRotation.png'
            titleText='Turret traverse'
            valueText={'+ ' + turretRotation.toFixed(4)}
            unit='m'
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', turretRotationBase, true)}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
            titleText='After firing'
            valueText={'* ' + afterShot.toFixed(4)}
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

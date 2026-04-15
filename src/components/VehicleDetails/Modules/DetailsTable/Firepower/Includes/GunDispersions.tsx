import { useContext, useState, useEffect, SetStateAction } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'
import type { DeviceModifierKeys } from '@/DevicesContext/Types'

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
      // setAppliedDeviceModifier,
   } = useContext(DeviceContext)

   const vehicleMovementBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement
   const vehicleRotationBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation
   const turretRotationBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation
   const afterShotBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot

   const [vehicleMovement, setVehicleMovement] = useState(vehicleMovementBase)
   const [vehicleRotation, setVehicleRotation] = useState(vehicleRotationBase)
   const [turretRotation, setTurretRotation] = useState(turretRotationBase)
   const [afterShot, setAfterShot] = useState(afterShotBase)

   /**
    *
    * @param {number} baseValue The original value of the vehicle component (e.g: vehicleTurret[selectedModuleNames.vehicleTurret].viewRange)
    * @param {DeviceModifierKeys} deviceNamme selected device name (e.g tankRammer | coatedOptics)
    * @param {string} modifierName e.g: vehicleCircularVisionRadius | vehicleChassisStrength | ehicleChassisRepairSpeed
    * @param setBaseValue State set function
    * @description This function checks if there are any applied modifiers for the selected device.
    * If there are, it finds the relevant modifier for the specific vehicle component and applies it to the base value,
    * updating the state with the new modified value.
    */
   function setAppliedDeviceModifier(
      baseValue: number,
      deviceNamme: DeviceModifierKeys,
      modifierName: string,
      setBaseValue: (value: SetStateAction<number>) => void,
   ) {
      if (!appliedDevicesModifiers || !appliedDevicesModifiers[deviceNamme]) {
         setBaseValue(baseValue)
      } else {
         const modifiersForDevice = appliedDevicesModifiers[deviceNamme]
         const foundModifier = modifiersForDevice.find((modifier) => modifier.name === modifierName)
         if (foundModifier) {
            setBaseValue(baseValue * foundModifier.value)
         }
      }
   }

   useEffect(() => {
      // setVehicleMovement(vehicleMovementBase)
      // setVehicleRotation(vehicleRotationBase)
      // setTurretRotation(turretRotationBase)
      // setAfterShot(afterShotBase)

      // console.log('vehicleMovement: ', vehicleMovement)
      // console.log('vehicleRotation: ', vehicleRotation)
      if (appliedDevicesModifiers) {
         let vehicleGunShotDispersionModified = 0
         for (const [deviceName, modifiers] of Object.entries(appliedDevicesModifiers)) {
            // itt ráteszem a modifiereket
            for (const modifier of modifiers) {
               switch (modifier.name) {
                  case 'vehicleGunShotDispersion':
                     vehicleGunShotDispersionModified = vehicleMovement * modifier.value
                     console.count('vehicleGunShotDispersionModified')
                  // setVehicleMovement((previousMovement) => {
                  //    console.log('previousMovement: ', previousMovement)
                  //    return previousMovement * modifier.value
                  // })
                  // console.log('vehicleMovement: ', vehicleMovement)

                  // setAppliedDeviceModifier(
                  //    vehicleMovementBase,
                  //    deviceName as DeviceModifierKeys,
                  //    modifier.name,
                  //    setVehicleMovement,
                  // )
                  // setAppliedDeviceModifier(
                  //    vehicleRotationBase,
                  //    deviceName as DeviceModifierKeys,
                  //    modifier.name,
                  //    setVehicleRotation,
                  // )
                  // setAppliedDeviceModifier(
                  //    turretRotationBase,
                  //    deviceName as DeviceModifierKeys,
                  //    modifier.name,
                  //    setTurretRotation,
                  // )
                  // setAppliedDeviceModifier(
                  //    afterShotBase,
                  //    deviceName as DeviceModifierKeys,
                  //    modifier.name,
                  //    setAfterShot,
                  // )
               }
            }
         }
         setVehicleMovement(vehicleGunShotDispersionModified)
         // console.log('vehicleGunShotDispersionModfied: ', vehicleGunShotDispersionModified)
      } else {
         setVehicleMovement(vehicleMovementBase)
         setVehicleRotation(vehicleRotationBase)
         setTurretRotation(turretRotationBase)
         setAfterShot(afterShotBase)
      }

      // setAppliedDeviceModifier(
      //    vehicleMovementBase,
      //    'aimingStabilizer',
      //    'vehicleGunShotDispersion',
      //    setVehicleMovement,
      // )
      // setAppliedDeviceModifier(
      //    vehicleRotationBase,
      //    'aimingStabilizer',
      //    'vehicleGunShotDispersion',
      //    setVehicleRotation,
      // )
      // setAppliedDeviceModifier(
      //    turretRotationBase,
      //    'aimingStabilizer',
      //    'vehicleGunShotDispersion',
      //    setTurretRotation,
      // )
      // setAppliedDeviceModifier(afterShotBase, 'aimingStabilizer', 'vehicleGunShotDispersion', setAfterShot)
   }, [
      selectedModuleNames,
      appliedDevicesModifiers,
      // setAppliedDeviceModifier,
      vehicleMovementBase,
      vehicleRotationBase,
      turretRotationBase,
      afterShotBase,
      // vehicleMovement,
      // vehicleRotation,
      // turretRotation,
      // afterShot,
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
            valueText={parseFloat(vehicleMovement.toFixed(4))}
            unit='m'
            paddingLeft
            modifiers={returnAppliedModifierDiplayValue('aimingStabilizer', vehicleMovementBase, true)}
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

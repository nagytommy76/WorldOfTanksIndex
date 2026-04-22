import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '@/src/utils/ApplyModifiers'

export default function useDispersion() {
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
   const accuracyWhileDamagedBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.whileDamaged

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

   return {
      vehicleMovement,
      vehicleRotation,
      turretRotation,
      afterShot,
      accuracy,
      accuracyBase,
      vehicleMovementBase,
      vehicleRotationBase,
      turretRotationBase,
      afterShotBase,
      accuracyWhileDamagedBase,
   }
}

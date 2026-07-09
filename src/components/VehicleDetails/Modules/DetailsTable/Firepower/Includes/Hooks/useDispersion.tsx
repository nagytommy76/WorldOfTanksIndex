import { useContext, useMemo } from 'react'

import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewTransformer from '@/utils/ApplyCrewModifiers'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

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
   const {
      crewReducer: { crewMembers },
      isCalculateSituational,
   } = useContext(CrewContext)

   const accuracyBase = vehicleGun[selectedModuleNames.vehicleGun].accuracy
   const vehicleMovementBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement
   const vehicleRotationBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation
   const turretRotationBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation
   const afterShotBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot
   const accuracyWhileDamagedBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.whileDamaged

   const { vehicleMovement, vehicleRotation, turretRotation, afterShot, accuracy } = useMemo(
      () =>
         applyStatPipeline(
            {
               accuracy: accuracyBase,
               vehicleMovement: vehicleMovementBase,
               vehicleRotation: vehicleRotationBase,
               turretRotation: turretRotationBase,
               afterShot: afterShotBase,
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewTransformer(crewMembers.gunner),
               createCrewSkillsTransformer(crewMembers.gunner, isCalculateSituational),
               createCrewSkillsTransformer(crewMembers.driver, isCalculateSituational),
            ],
         ),
      [
         vehicleMovementBase,
         vehicleRotationBase,
         turretRotationBase,
         afterShotBase,
         accuracyBase,
         appliedDevicesModifiers,
         crewMembers,
         isCalculateSituational,
      ],
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

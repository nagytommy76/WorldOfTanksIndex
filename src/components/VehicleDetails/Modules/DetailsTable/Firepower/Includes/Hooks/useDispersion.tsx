import { useContext, useMemo } from 'react'

import { FieldModificationContext } from '@/FieldModificationContext/FieldModificationContext'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewTransformer from '@/utils/ApplyCrewModifiers'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import createBaseFieldModTransformer from '@/utils/FieldModifications/ApplyFieldModifications'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'
import { createDeviceBoostersTransformer } from '@/src/utils/ApplyDeviceBooster'

export default function useDispersion() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleGun, vehicleChassis },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers, appliedBattleBoosterModifiers },
   } = useContext(DeviceContext)
   const {
      fieldModReducer: { appliedBaseModifications },
   } = useContext(FieldModificationContext)
   const {
      crewReducer: { crewMembers, commander },
      hasAppliedCrewBooster,
      isCalculateSituational,
   } = useContext(CrewContext)

   const accuracyBase = vehicleGun[selectedModuleNames.vehicleGun].accuracy
   const vehicleMovementBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleMovement
   const vehicleRotationBase = vehicleChassis[selectedModuleNames.vehicleChassis].dispersion.vehicleRotation
   const turretRotationBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.turretRotation
   const afterShotBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.afterShot
   const accuracyWhileDamagedBase = vehicleGun[selectedModuleNames.vehicleGun].dispersion.whileDamaged

   const { vehicleMovement, vehicleRotation, turretRotation, afterShot, accuracy, accuracyWhileDamaged } =
      useMemo(
         () =>
            applyStatPipeline(
               {
                  accuracy: accuracyBase,
                  vehicleMovement: vehicleMovementBase,
                  vehicleRotation: vehicleRotationBase,
                  turretRotation: turretRotationBase,
                  afterShot: afterShotBase,
                  accuracyWhileDamaged: accuracyWhileDamagedBase,
               },
               [
                  createDeviceTransformer(appliedDevicesModifiers),
                  createDeviceBoostersTransformer(appliedBattleBoosterModifiers),
                  createCrewTransformer(commander, crewMembers),
                  createCrewSkillsTransformer(commander, crewMembers, isCalculateSituational),
                  createBaseFieldModTransformer(appliedBaseModifications),
               ],
            ),
         // eslint-disable-next-line react-hooks/exhaustive-deps
         [
            vehicleMovementBase,
            vehicleRotationBase,
            turretRotationBase,
            afterShotBase,
            accuracyBase,
            appliedDevicesModifiers,
            appliedBattleBoosterModifiers,
            appliedBaseModifications,
            commander,
            crewMembers,
            isCalculateSituational,
            hasAppliedCrewBooster,
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
      accuracyWhileDamaged,
   }
}

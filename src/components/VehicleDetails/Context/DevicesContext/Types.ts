import type { SetStateAction } from 'react'

/**
 * @param name Name of the equipment modifier, e.g: vehicleCircularVisionRadius
 * @param value The actual modifier value, e.g: 10% view range increase = 1.1 (or specValue: 1.115)
 */
export interface IAppliedDeviceModifier {
   name: string
   value: number
}

export type DeviceModifierKeys = keyof typeof deviceModifierNames

export type DeviceModifiers = {
   [archeType in DeviceModifierKeys]: IAppliedDeviceModifier[]
}

export interface IDevicesReducerState {
   appliedDevicesModifiers: DeviceModifiers | null
}

export type IDevicesContextActions =
   | {
        type: 'SET_DEVICE_MODIFIER'
        payload: { name: string; value: number; archeType: DeviceModifierKeys }
     }
   | { type: 'REMOVE_DEVICE_MODIFIER'; payload: { archeType: DeviceModifierKeys } }

export const devicesInitialState: IDevicesReducerState = {
   appliedDevicesModifiers: null,
}

export interface IDeviceContext {
   deviceReducer: IDevicesReducerState
   deviceDispatch: React.Dispatch<IDevicesContextActions>
   returnAppliedModifierDiplayValue(
      deviceNamme: DeviceModifierKeys,
      selectedSpecification: string | number,
      isBetter?: boolean,
   ):
      | {
           difference: number
           improved: boolean
        }[]
      | null
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
   setAppliedDeviceModifier(
      baseValue: number,
      deviceNamme: DeviceModifierKeys,
      modifierName: string,
      setBaseValue: (value: SetStateAction<number>) => void,
   ): void
}

export const deviceModifierNames = {
   tankRammer: ['vehicleGunReloadTime'],
   antifragmentationLining: [
      'vehicleHEShellDamageResistance',
      'vehicleRamDamageResistance',
      'crewHitChance',
      'crewStunDuration',
      'crewRepeatedStunDuration',
   ],
   aimingStabilizer: ['vehicleGunShotDispersion'],
   additionalInvisibilityDevice: ['vehicleCamouflage', 'vehicleCamouflage', 'vehicleCamouflage'],
   enhancedAimDrives: ['vehicleGunAimSpeed'],
   extraHealthReserve: [
      'vehicleStrength',
      'vehicleChassisStrength',
      'vehicleChassisRepairSpeed',
      'vehicleChassisFallDamage',
   ],
   improvedRotationMechanism: [
      'vehicleTurretOrCuttingRotationSpeed',
      'vehicleAllGroundRotationSpeed',
      'vehicleGunShotDispersion',
   ],
   improvedSights: ['vehicleGunShotFullDispersion'],
   commandersView: ['demaskFoliageFactor', 'demaskMovingFactor'],
   grousers: ['vehicleAllGroundRotationSpeed', 'vehicleSpeedGain'],
   coatedOptics: ['vehicleCircularVisionRadius'],
   camouflageNet: ['vehicleStillCamouflageDeluxe'],
   improvedVentilation: ['crewLevel'],
   turbocharger: ['vehicleEnginePower', 'vehicleForwardMaxSpeed', 'vehicleBackwardMaxSpeed'],
   improvedConfiguration: [
      'vehicleRepairSpeed',
      'vehicleAmmoBayEngineFuelStrength',
      'vehPenaltyForDamagedEngine',
      'vehPenaltyForDamagedAmmorack',
      'vehicleFireChance',
   ],
   improvedRadioCommunication: ['vehicleEnemySpottingTime', 'vehicleOwnSpottingTime'],
   stereoscope: ['vehicleStillCircularVisionRadiusDeluxe, vehicleStillCircularVisionRadius'],

   modernizedTurbochargerRotationMechanism: [
      'vehicleEnginePower',
      'vehicleTurretOrCuttingRotationSpeed',
      'vehicleAllGroundRotationSpeed',
      'vehicleGunShotDispersion',
      'vehicleForwardMaxSpeed',
      'vehicleBackwardMaxSpeed',
   ],
   modernizedExtraHealthReserveAntifragmentationLining: [
      'vehicleStrength',
      'vehicleAmmoBayEngineFuelStrength',
      'vehicleChassisStrength',
      'vehicleChassisRepairSpeed',
      'vehPenaltyForDamagedEngine',
      'vehPenaltyForDamagedAmmorack',
   ],
   modernizedAimDrivesAimingStabilizer: ['vehicleGunAimSpeed', 'vehicleGunShotDispersion'],
   modernizedImprovedSightsEnhancedAimDrives: ['vehicleGunShotFullDispersion', 'vehicleGunAimSpeed'],
}

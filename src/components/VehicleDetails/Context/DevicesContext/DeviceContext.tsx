'use client'
import { createContext, useState } from 'react'
import type { DeviceModifiers } from './Types'

interface IDeviceContext {
   appliedDevicesModifiers: DeviceModifiers | null
   setDeviceModifier(name: string, value: number, archeType: string): void
   removeDeviceModifier(archeType: string): void
}

export const DeviceContext = createContext<IDeviceContext>({
   appliedDevicesModifiers: null,
   setDeviceModifier() {},
   removeDeviceModifier() {},
})

export default function DeviceContextProvider({ children }: { children: React.ReactNode }) {
   const [appliedDevicesModifiers, setAppliedDevicesModifiers] = useState<DeviceModifiers | null>(null)

   function setDeviceModifier(name: string, value: number, archeType: string) {
      setAppliedDevicesModifiers((previous) => {
         const previousForArchetype = previous?.[archeType] ?? []
         const otherModifiersForArchetype = previousForArchetype.filter((m) => m.name !== name)
         return {
            ...previous,
            [archeType]: [...otherModifiersForArchetype, { name, value }],
         }
      })
   }

   function removeDeviceModifier(archeType: string) {
      setAppliedDevicesModifiers((previous) => {
         if (!previous) return null
         const { [archeType]: _, ...rest } = previous
         return rest
      })
   }

   return (
      <DeviceContext.Provider
         value={{
            appliedDevicesModifiers,
            setDeviceModifier,
            removeDeviceModifier,
         }}
      >
         {children}
      </DeviceContext.Provider>
   )
}

const deviceModifierNames = {
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

'use client'
import { createContext, SetStateAction, useReducer } from 'react'
import type { DeviceModifierKeys, IDeviceContext } from './Types'
import { devicesInitialState } from './Types'
import DevicesReducer from './DevicesReducer'

export const DeviceContext = createContext<IDeviceContext>({
   deviceReducer: devicesInitialState,
   deviceDispatch() {},
   returnAppliedModifierDiplayValue() {
      return null
   },
   setAppliedDeviceModifier() {},
})

export default function DeviceContextProvider({ children }: { children: React.ReactNode }) {
   const [deviceReducer, deviceDispatch] = useReducer(DevicesReducer, devicesInitialState)
   const appliedDevicesModifiers = deviceReducer.appliedDevicesModifiers

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
      if (!baseValue) return
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

   function returnAppliedModifierDiplayValue(
      deviceNamme: DeviceModifierKeys,
      selectedSpecificationValue: string | number,
   ) {
      if (!appliedDevicesModifiers || !appliedDevicesModifiers[deviceNamme]) return null
      if (typeof selectedSpecificationValue === 'string')
         selectedSpecificationValue = parseFloat(selectedSpecificationValue)

      return appliedDevicesModifiers[deviceNamme].map((modifier) => {
         const difference = Number(
            (modifier.value * selectedSpecificationValue - selectedSpecificationValue).toFixed(2),
         )
         return {
            difference: difference,
            improved: modifier.value > 0,
         }
      })
   }

   return (
      <DeviceContext.Provider
         value={{
            deviceDispatch,
            deviceReducer,
            returnAppliedModifierDiplayValue,
            setAppliedDeviceModifier,
         }}
      >
         {children}
      </DeviceContext.Provider>
   )
}

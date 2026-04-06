'use client'
import { createContext, useReducer } from 'react'
import type { DeviceModifierKeys, IDeviceContext } from './Types'
import { devicesInitialState } from './Types'
import DevicesReducer from './DevicesReducer'

export const DeviceContext = createContext<IDeviceContext>({
   deviceReducer: devicesInitialState,
   deviceDispatch() {},
   returnAppliedModifierDiplayValue() {
      return null
   },
})

export default function DeviceContextProvider({ children }: { children: React.ReactNode }) {
   const [deviceReducer, deviceDispatch] = useReducer(DevicesReducer, devicesInitialState)

   function returnAppliedModifierDiplayValue(
      deviceNamme: DeviceModifierKeys,
      selectedSpecificationValue: string | number,
   ) {
      if (!deviceReducer.appliedDevicesModifiers || !deviceReducer.appliedDevicesModifiers[deviceNamme])
         return null
      if (typeof selectedSpecificationValue === 'string')
         selectedSpecificationValue = parseFloat(selectedSpecificationValue)

      return deviceReducer.appliedDevicesModifiers[deviceNamme].map((modifier) => {
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
         }}
      >
         {children}
      </DeviceContext.Provider>
   )
}

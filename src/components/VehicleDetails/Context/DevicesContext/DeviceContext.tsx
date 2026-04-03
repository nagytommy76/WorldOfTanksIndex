'use client'
import { createContext, useState } from 'react'

/**
 * @param name Name of the equipment modifier, e.g: vehicleCircularVisionRadius
 * @param value The actual modifier value, e.g: 10% view range increase = 1.1 (or specValue: 1.115)
 */
interface IAppliedDeviceModifier {
   name: string
   value: number
}

type DeviceModifiers = {
   [archeType: string]: IAppliedDeviceModifier[]
}

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

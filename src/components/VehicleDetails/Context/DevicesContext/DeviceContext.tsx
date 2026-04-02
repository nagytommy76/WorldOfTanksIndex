'use client'
import { createContext, useReducer, useState } from 'react'

export const DeviceContext = createContext({
   appliedDeviceModifiers: null,
})

interface IAppliedDeviceModifier {
   name: string
   specValue: number | null
   value: number
}

export default function DeviceContextProvider() {
   const [appliedDeviceModifiers, setAppliedDeviceModifiers] = useState<IAppliedDeviceModifier[] | null>(null)
   return <div>DeviceContext</div>
}

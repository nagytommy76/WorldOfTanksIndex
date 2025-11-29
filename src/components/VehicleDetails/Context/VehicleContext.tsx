import { createContext, useReducer } from 'react'
import TomatoReducer from './VehicleReducer'
import type { ICamo, IFuelTank, ISpeedLimit } from '@VehicleTypes/Other'
import type { IHull } from '@VehicleTypes/Hull'

import { InitialState, IVehicleContext } from './Types'

import useGetTankStats from './Hooks/useGetTankStats'
import useSetChassis from './Hooks/useSetChassis'
import useSetRadios from './Hooks/useSetRadios'
import useSetGuns from './Hooks/useSetGuns'
import useSetTurrets from './Hooks/useSetTurrets'
import useSetEngines from './Hooks/useSetEngines'

export const VehicleContext = createContext<IVehicleContext>({
   vehicleDispatch: () => null,
   vehicleReducer: InitialState,
   hull: {} as IHull,
   fuelTank: {} as IFuelTank,
   speedLimit: {} as ISpeedLimit,
   camo: {} as ICamo,
   tankCost: 0,
})

export default function VehicleContextProvider({
   children,
   tank_short_name,
   tank_id,
}: {
   children: React.ReactNode
   tank_short_name: string
   tank_id: string
}) {
   const { data: tankData } = useGetTankStats(tank_short_name, tank_id)
   const [vehicleReducer, vehicleDispatch] = useReducer(TomatoReducer, InitialState)

   useSetChassis(tankData, vehicleDispatch)
   useSetRadios(tankData, vehicleDispatch)
   useSetTurrets(tankData, vehicleDispatch)
   useSetGuns(tankData, vehicleDispatch, vehicleReducer.selectedModuleNames.vehicleTurret)
   useSetEngines(tankData, vehicleDispatch)

   return (
      <VehicleContext.Provider
         value={{
            hull: tankData?.stats.hull,
            fuelTank: tankData?.stats.fuelTank,
            speedLimit: tankData?.stats.speedLimit,
            camo: tankData?.stats.camo,
            tankCost: tankData?.price,
            vehicleReducer,
            vehicleDispatch,
         }}
      >
         {children}
      </VehicleContext.Provider>
   )
}

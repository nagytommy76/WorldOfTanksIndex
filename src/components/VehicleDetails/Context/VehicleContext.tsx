'use client'
import { createContext, useReducer } from 'react'
import VehicleReducer from './VehicleReducer'
import type { ICamo, IFuelTank, ISpeedLimit } from '@VehicleTypes/Other'
import type { IHull } from '@VehicleTypes/Hull'
import type { ITankData } from '@VehicleTypes/Vehicle'

import { InitialState, IVehicleContext } from './Types'

import useSetChassis from './Hooks/useSetChassis'
import useSetRadios from './Hooks/useSetRadios'
import useSetGuns from './Hooks/useSetGuns'
import useSetTurrets from './Hooks/useSetTurrets'
import useSetEngines from './Hooks/useSetEngines'
import useSetMechanics from './Hooks/useSetMechanics'

export const VehicleContext = createContext<IVehicleContext>({
   vehicleDispatch: () => null,
   vehicleReducer: InitialState,
   hull: {} as IHull,
   fuelTank: {} as IFuelTank[],
   speedLimit: {} as ISpeedLimit,
   camo: {} as ICamo,
   tankCost: 0,
   vehicleName: '',
   /**
    * @description Mechanics for TIER XI tanks
    */
   mechanics: null,
})

export default function VehicleContextProvider({
   children,
   tankDetails,
}: {
   children: React.ReactNode
   tankDetails: ITankData
}) {
   const [vehicleReducer, vehicleDispatch] = useReducer(VehicleReducer, InitialState)

   useSetChassis(tankDetails, vehicleDispatch)
   useSetRadios(tankDetails, vehicleDispatch)
   useSetTurrets(tankDetails, vehicleDispatch)
   useSetGuns(tankDetails, vehicleDispatch, vehicleReducer.selectedModuleNames.vehicleTurret)
   useSetEngines(tankDetails, vehicleDispatch)
   const mechanics = useSetMechanics(tankDetails.mechanics)

   return (
      <VehicleContext.Provider
         value={{
            vehicleName: tankDetails?.xmlId,
            hull: tankDetails?.stats.hull,
            fuelTank: tankDetails?.stats.fuelTank,
            speedLimit: tankDetails?.stats.speedLimit,
            camo: tankDetails?.stats.camo,
            tankCost: tankDetails?.price,
            mechanics,
            vehicleReducer,
            vehicleDispatch,
         }}
      >
         {children}
      </VehicleContext.Provider>
   )
}

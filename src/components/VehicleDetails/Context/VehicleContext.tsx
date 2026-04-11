'use client'
import { createContext, useReducer } from 'react'
import VehicleReducer from './VehicleReducer'
import ModifiersReducer from './ModifiersReducer'

import type { ICamo, IFuelTank, ISpeedLimit } from '@VehicleTypes/Other'
import type { IHull } from '@VehicleTypes/Hull'
import type { ITankData } from '@VehicleTypes/Vehicle'

import { modifiersInitialState } from './ModifiersTypes'
import { InitialState, IVehicleContext, isVehicleReady, ReadyVehicleReducerState } from './Types'

import useSetChassis from './Hooks/useSetChassis'
import useSetRadios from './Hooks/useSetRadios'
import useSetGuns from './Hooks/useSetGuns'
import useSetTurrets from './Hooks/useSetTurrets'
import useSetEngines from './Hooks/useSetEngines'
import useSetMechanics from './Hooks/useSetMechanics'
import useSetSiegeMode from './Hooks/useSetSiegeMode'
import useSetBooster from './Hooks/useSetBooster'
import useSetProvisions from './Hooks/useSetProvisions'
import useSetRoles from './Hooks/useSetRoles'
import useSetShells from './Hooks/useSetShells'

export const VehicleContext = createContext<IVehicleContext>({
   vehicleDispatch: () => null,
   vehicleReducer: InitialState as ReadyVehicleReducerState,
   modifiersDispatch: () => null,
   modifiersReducer: modifiersInitialState,
   hull: {} as IHull,
   fuelTank: {} as IFuelTank[],
   speedLimit: {} as ISpeedLimit,
   camo: {} as ICamo,
   tankCost: 0,
   vehicleName: '',
   provisions: [],
   vehicleType: 'SPG',
   vehicleTier: 1,
   supplySlotCategory: null,
   customRoleSlotOptions: null,
   /**
    * @description Mechanics for TIER XI tanks
    */
   rocketAcceleration: null,
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
   const [modifiersReducer, modifiersDispatch] = useReducer(ModifiersReducer, modifiersInitialState)

   useSetChassis(tankDetails, vehicleDispatch)
   useSetRadios(tankDetails, vehicleDispatch)
   useSetTurrets(tankDetails, vehicleDispatch)
   useSetGuns(tankDetails, vehicleDispatch, vehicleReducer.selectedModuleNames.vehicleTurret)
   useSetEngines(tankDetails, vehicleDispatch)
   useSetSiegeMode(tankDetails, vehicleDispatch)
   useSetShells(
      tankDetails,
      vehicleDispatch,
      modifiersDispatch,
      vehicleReducer.selectedModuleNames.vehicleTurret,
      vehicleReducer.selectedModuleNames.vehicleGun,
   )
   const mechanics = useSetMechanics(tankDetails.mechanics)
   const rocketBooser = useSetBooster(tankDetails.stats.rocketAcceleration)
   const provisions = useSetProvisions(tankDetails.tankDetails?.provisions)
   const supplySlotCategory = useSetRoles(tankDetails.supplySlotCategory)

   if (!isVehicleReady(vehicleReducer)) {
      return <h1>LOADING...</h1> // or your spinner component
   }

   return (
      <VehicleContext.Provider
         value={{
            vehicleName: tankDetails.xmlId,
            hull: tankDetails.stats.hull,
            fuelTank: tankDetails.stats.fuelTank,
            speedLimit: tankDetails.stats.speedLimit,
            camo: tankDetails.stats.camo,
            tankCost: tankDetails.price,
            mechanics,
            rocketAcceleration: rocketBooser,
            provisions,
            supplySlotCategory,
            vehicleReducer: vehicleReducer as ReadyVehicleReducerState,
            vehicleType: tankDetails.type,
            vehicleTier: tankDetails.tier,
            vehicleDispatch,
            modifiersDispatch,
            modifiersReducer,
         }}
      >
         {children}
      </VehicleContext.Provider>
   )
}

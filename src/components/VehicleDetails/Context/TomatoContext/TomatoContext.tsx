import { createContext, useReducer } from 'react'
import TomatoReducer from './TomatoReducer'
import type { ICamo, IFuelTank, ISpeedLimit } from '@VehicleTypes/Other'
import type { IHull } from '@VehicleTypes/Hull'

import { ITomatoContext, tomatoInitialState } from './Types'

import useGetTomatoTankStats from '../Hooks/useGetTomatoTankStats'
import useSetChassis from './Hooks/useSetChassis'
import useSetRadios from './Hooks/useSetRadios'
import useSetGuns from './Hooks/useSetGuns'
import useSetTurrets from './Hooks/useSetTurrets'
import useSetEngines from './Hooks/useSetEngines'

export const TomatoContext = createContext<ITomatoContext>({
   tomatoDispatch: () => null,
   tomatoReducer: tomatoInitialState,
   hull: {} as IHull,
   fuelTank: {} as IFuelTank,
   speedLimit: {} as ISpeedLimit,
   camo: {} as ICamo,
   tankCost: 0,
})

export default function TomatoContextProvider({
   children,
   tank_short_name,
   tank_id,
}: {
   children: React.ReactNode
   tank_short_name: string
   tank_id: string
}) {
   const { data: tankData } = useGetTomatoTankStats(tank_short_name, tank_id)
   const [tomatoReducer, tomatoDispatch] = useReducer(TomatoReducer, tomatoInitialState)

   useSetChassis(tankData, tomatoDispatch)
   useSetRadios(tankData, tomatoDispatch)
   useSetTurrets(tankData, tomatoDispatch)
   useSetGuns(tankData, tomatoDispatch, tomatoReducer.selectedModuleNames.vehicleTurret)
   useSetEngines(tankData, tomatoDispatch)

   return (
      <TomatoContext.Provider
         value={{
            hull: tankData?.stats.hull,
            fuelTank: tankData?.stats.fuelTank,
            speedLimit: tankData?.stats.speedLimit,
            camo: tankData?.stats.camo,
            tankCost: tankData?.price,
            tomatoReducer,
            tomatoDispatch,
         }}
      >
         {children}
      </TomatoContext.Provider>
   )
}

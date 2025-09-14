import { createContext, useReducer } from 'react'
import TomatoReducer from './TomatoReducer'
import type { IFuelTank, IHull, ISpeedLimit } from '@/types/VehicleDetails/tomatoGGTankStats'

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
   const tankData = useGetTomatoTankStats(tank_short_name, tank_id)
   const [tomatoReducer, tomatoDispatch] = useReducer(TomatoReducer, tomatoInitialState)

   useSetChassis(tankData.tankData, tomatoDispatch)
   useSetRadios(tankData.tankData, tomatoDispatch)
   useSetTurrets(tankData.tankData, tomatoDispatch)
   useSetGuns(tankData.tankData, tomatoDispatch, tomatoReducer.selectedModuleNames.vehicleTurret)
   useSetEngines(tankData.tankData, tomatoDispatch)

   return (
      <TomatoContext.Provider
         value={{
            hull: tankData.tankData?.stats.hull,
            fuelTank: tankData.tankData?.stats.fuelTank,
            speedLimit: tankData.tankData?.stats.speedLimit,
            tomatoReducer,
            tomatoDispatch,
         }}
      >
         {children}
      </TomatoContext.Provider>
   )
}

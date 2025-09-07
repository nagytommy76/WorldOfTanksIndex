import { createContext, useReducer } from 'react'
import TomatoReducer from './TomatoReducer'

import type { ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'
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
   tankData: {} as ITankData,
})

export default function TomatoContextProvider({ children }: { children: React.ReactNode }) {
   const [tomatoReducer, tomatoDispatch] = useReducer(TomatoReducer, tomatoInitialState)
   const tankData = useGetTomatoTankStats()

   useSetChassis(tankData.tankData, tomatoDispatch)
   useSetRadios(tankData.tankData, tomatoDispatch)
   useSetGuns(tankData.tankData, tomatoDispatch)
   useSetTurrets(tankData.tankData, tomatoDispatch)
   useSetEngines(tankData.tankData, tomatoDispatch)

   return (
      <TomatoContext.Provider
         value={{
            tankData: tankData.tankData,
            tomatoReducer,
            tomatoDispatch,
         }}
      >
         {children}
      </TomatoContext.Provider>
   )
}

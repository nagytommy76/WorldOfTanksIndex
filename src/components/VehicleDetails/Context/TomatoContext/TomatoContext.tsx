import { createContext, useReducer } from 'react'
import TomatoReducer from './TomatoReducer'

import type { ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'
import type { IModules } from '@/types/VehicleDetails/module'
import { ITomatoContext, tomatoInitialState } from './Types'

import useGroupModules from '../Hooks/useGroupModules'
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

export default function TomatoContextProvider({
   children,
   modulesTree,
   tank_short_name,
   tank_id,
}: {
   children: React.ReactNode
   modulesTree: { [module_id: number]: IModules }
   tank_short_name: string
   tank_id: string
}) {
   const tankData = useGetTomatoTankStats(tank_short_name, tank_id)
   const [tomatoReducer, tomatoDispatch] = useReducer(TomatoReducer, tomatoInitialState)

   useGroupModules(modulesTree, tomatoDispatch)
   useSetChassis(tankData.tankData, tomatoDispatch)
   useSetRadios(tankData.tankData, tomatoDispatch)
   useSetGuns(tankData.tankData, tomatoDispatch, tomatoReducer.selectedModuleNames.vehicleTurret)
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

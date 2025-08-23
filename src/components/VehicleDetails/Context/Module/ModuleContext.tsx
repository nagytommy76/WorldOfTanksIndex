import { createContext, useReducer } from 'react'
import ModuleReducer from './ModuleReducer'
import { moduleInitialState, type IModulesContext } from './Types'

import useGroupModules from '../Hooks/useGroupModules'
import { IModules } from '@/types/VehicleDetails/module'

export const ModuleContext = createContext<IModulesContext>({
   tank_id: '',
   modulesReducer: moduleInitialState,
   modulesDispatch: function (): void {
      throw new Error('Function not implemented.')
   },
})

export default function ModuleContextProvider({
   children,
   modulesTree,
   tank_id,
}: {
   children: React.ReactNode
   modulesTree: { [module_id: number]: IModules }
   tank_id: string
}) {
   const [modulesReducer, modulesDispatch] = useReducer(ModuleReducer, moduleInitialState)
   useGroupModules(modulesTree, modulesDispatch)

   return (
      <ModuleContext.Provider value={{ modulesReducer, modulesDispatch, tank_id }}>
         {children}
      </ModuleContext.Provider>
   )
}

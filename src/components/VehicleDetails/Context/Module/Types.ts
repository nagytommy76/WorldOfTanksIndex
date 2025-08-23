import type { IModules, ModuleType } from '@/types/VehicleDetails/module'

interface setModuleGroupByTypeAction {
   type: 'SET_MODULE_GROUP'
   payload: { [moduleType in ModuleType]: IModules[] }
}

interface setSelectedModuleIdsByTypeAction {
   type: 'SET_SELECTED_MODULE_IDS'
   payload: { [moduleType in ModuleType]: number }
}

interface setModuleIdByType {
   type: 'SET_MODULE_ID_BY_TYPE'
   payload: { type: ModuleType; value: number }
}

export type IModuleContextActions =
   | setModuleGroupByTypeAction
   | setSelectedModuleIdsByTypeAction
   | setModuleIdByType

export interface IModulesReducerState {
   moduleGroup: { [moduleType in ModuleType]: IModules[] }
   selectedModuleIds: {
      [moduleType in ModuleType]: number | null
   }
}

export const moduleInitialState: IModulesReducerState = {
   moduleGroup: {
      vehicleChassis: [],
      vehicleEngine: [],
      vehicleGun: [],
      vehicleRadio: [],
      vehicleTurret: [],
   },
   selectedModuleIds: {
      vehicleChassis: null,
      vehicleEngine: null,
      vehicleGun: null,
      vehicleRadio: null,
      vehicleTurret: null,
   },
}

// CONTEXT
export interface IModulesContext {
   tank_id: string
   modulesReducer: IModulesReducerState
   modulesDispatch: React.Dispatch<IModuleContextActions>
}

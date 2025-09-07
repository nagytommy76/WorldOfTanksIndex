import type { IModules, ModuleType } from '@/types/VehicleDetails/module'

interface setModuleGroupByTypeAction {
   type: 'SET_MODULE_GROUP'
   payload: { [moduleType in ModuleType]: IModules[] }
}

interface setSelectedModuleIdsByTypeAction {
   type: 'SET_SELECTED_MODULE_NAMES'
   payload: { [moduleType in ModuleType]: string }
}

interface setModuleIdByType {
   type: 'SET_MODULE_NAME_BY_TYPE'
   payload: { type: ModuleType; value: string }
}

export type IModuleContextActions =
   | setModuleGroupByTypeAction
   | setSelectedModuleIdsByTypeAction
   | setModuleIdByType

export interface IModulesReducerState {
   moduleGroup: { [moduleType in ModuleType]: IModules[] }
   selectedModuleNames: {
      [moduleType in ModuleType]: string
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
   selectedModuleNames: {
      vehicleChassis: '',
      vehicleEngine: '',
      vehicleGun: '',
      vehicleRadio: '',
      vehicleTurret: '',
   },
}

// CONTEXT
export interface IModulesContext {
   tank_id: string
   tank_short_name: string
   modulesReducer: IModulesReducerState
   modulesDispatch: React.Dispatch<IModuleContextActions>
}

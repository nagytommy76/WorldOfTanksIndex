import type { IVehicleReducerState, IVehicleContextActions, ModuleTypeMap } from './Types'

// Generic helper for module updates
function updateModuleGroup<K extends keyof ModuleTypeMap>(
   state: IVehicleReducerState,
   key: K,
   payload: { [moduleName: string]: ModuleTypeMap[K] },
): IVehicleReducerState {
   return {
      ...state,
      moduleGroup: { ...state.moduleGroup, [key]: payload },
   }
}

export default function VehicleReducer(
   state: IVehicleReducerState,
   { payload, type }: IVehicleContextActions,
) {
   switch (type) {
      case 'SET_CHASSIS':
         return updateModuleGroup(state, 'vehicleChassis', payload)
      case 'SET_ENGINES':
         return updateModuleGroup(state, 'vehicleEngine', payload)
      case 'SET_GUNS':
         return updateModuleGroup(state, 'vehicleGun', payload)
      case 'SET_RADIOS':
         return updateModuleGroup(state, 'vehicleRadio', payload)
      case 'SET_TURRETS':
         return updateModuleGroup(state, 'vehicleTurret', payload)
      case 'SET_SHELLS':
         return updateModuleGroup(state, 'shells', payload)
      case 'SET_SIEGE_MODE':
         return { ...state, siegeMode: payload }
      case 'SET_MODULE_NAME_BY_TYPE':
         return {
            ...state,
            selectedModuleNames: {
               ...state.selectedModuleNames,
               [payload.type]: payload.value,
            },
         }
      default:
         return state
   }
}

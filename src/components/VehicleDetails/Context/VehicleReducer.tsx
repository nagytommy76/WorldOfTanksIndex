import type { IVehicleReducerState, IVehicleContextActions } from './Types'

export default function TomatoReducer(
   state: IVehicleReducerState,
   { payload, type }: IVehicleContextActions
) {
   switch (type) {
      case 'SET_CHASSIS':
         return {
            ...state,
            moduleGroup: { ...state.moduleGroup, vehicleChassis: payload },
         }
      case 'SET_ENGINES':
         return {
            ...state,
            moduleGroup: { ...state.moduleGroup, vehicleEngine: payload },
         }
      case 'SET_GUNS':
         return {
            ...state,
            moduleGroup: { ...state.moduleGroup, vehicleGun: payload },
         }
      case 'SET_RADIOS':
         return {
            ...state,
            moduleGroup: { ...state.moduleGroup, vehicleRadio: payload },
         }
      case 'SET_TURRETS':
         return {
            ...state,
            moduleGroup: { ...state.moduleGroup, vehicleTurret: payload },
         }
      case 'SET_SHELLS':
         return {
            ...state,
            moduleGroup: { ...state.moduleGroup, shells: payload },
         }
      case 'SET_MODULE_NAME_BY_TYPE':
         return {
            ...state,
            selectedModuleNames: { ...state.selectedModuleNames, [payload.type]: payload.value },
         }
      default:
         return state
   }
}

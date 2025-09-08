import type { ITomatoContextActions, ITomatoReducerState } from './Types'

export default function TomatoReducer(state: ITomatoReducerState, { payload, type }: ITomatoContextActions) {
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
            shells: payload,
         }
      case 'SET_SELECTED_MODULE_NAMES':
         return {
            ...state,
            selectedModuleNames: payload,
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

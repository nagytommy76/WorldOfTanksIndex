import type { IModuleContextActions, IModulesReducerState } from './Types'

export default function ModuleReducer(state: IModulesReducerState, { payload, type }: IModuleContextActions) {
   switch (type) {
      case 'SET_MODULE_GROUP':
         return {
            ...state,
            moduleGroup: payload,
         }
      case 'SET_SELECTED_MODULE_IDS':
         return {
            ...state,
            selectedModuleIds: payload,
         }
      case 'SET_MODULE_ID_BY_TYPE':
         return {
            ...state,
            selectedModuleIds: { ...state.selectedModuleIds, [payload.type]: payload.value },
         }
      default: {
         return {
            ...state,
         }
      }
   }
}

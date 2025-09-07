import type { IModuleContextActions, IModulesReducerState } from './Types'

export default function ModuleReducer(state: IModulesReducerState, { payload, type }: IModuleContextActions) {
   switch (type) {
      case 'SET_MODULE_GROUP':
         return {
            ...state,
            moduleGroup: payload,
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
      default: {
         return {
            ...state,
         }
      }
   }
}

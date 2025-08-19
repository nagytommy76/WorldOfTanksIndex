import type { IModuleAction, IModulesReducerState } from './Types'

export default function ModuleReducer(state: IModulesReducerState, { payload, type }: IModuleAction) {
   switch (type) {
      case 'SET_MODULE_GROUP':
         return {
            ...state,
            moduleGroup: payload,
         }

      default:
         break
   }
}

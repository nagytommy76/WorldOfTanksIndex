import type { IModifiersReducerState, IModifiersContextActions } from './ModifiersTypes'

export default function ModifiersReducer(
   state: IModifiersReducerState,
   { payload, type }: IModifiersContextActions,
) {
   switch (type) {
      case 'SET_SHELLS_MODIFIERS':
         return { ...state, modifiers: { ...state.modifiers, shells: payload } }
      case 'RESET_SHELLS_MODIFIERS':
         return { ...state, modifiers: { ...state.modifiers, shells: {} } }
      default:
         return state
   }
}

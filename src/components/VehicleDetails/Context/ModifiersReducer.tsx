import { type IModifiersReducerState, type IModifiersContextActions } from './ModifiersTypes'

export default function ModifiersReducer(
   state: IModifiersReducerState,
   { payload, type }: IModifiersContextActions,
) {
   switch (type) {
      case 'SET_SHELLS_MODIFIERS':
         return { ...state, modifiers: { ...state.modifiers, shells: payload } }
      case 'RESET_SHELLS_MODIFIERS':
         return {
            ...state,
            modifiers: {
               ...state.modifiers,
               shells: {
                  'damage.armor': null,
                  speed: null,
                  maxDistance: null,
                  price: null,
                  'piercingPower[0]': null,
                  'piercingPower[1]': null,
               },
            },
         }
      case 'SET_DEFAULT_SHELL_NAME':
         return {
            ...state,
            defaultModuleNames: { ...state.defaultModuleNames, shells: payload.shells },
         }
      default:
         return state
   }
}

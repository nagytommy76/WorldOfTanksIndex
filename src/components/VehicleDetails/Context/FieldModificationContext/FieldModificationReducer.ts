import {
   fieldModificationInitialState,
   type IFieldModificationContextActions,
   type IFieldModificationReducerState,
} from './Types'

/**
 * @description Keeps the pair choices of the unlocked levels only
 */
function keepUnlockedPairChoices(
   pairChoices: IFieldModificationReducerState['pairChoices'],
   unlockedLevel: number,
): IFieldModificationReducerState['pairChoices'] {
   return Object.fromEntries(Object.entries(pairChoices).filter(([level]) => Number(level) <= unlockedLevel))
}

export default function FieldModificationReducer(
   state: IFieldModificationReducerState,
   action: IFieldModificationContextActions,
): IFieldModificationReducerState {
   switch (action.type) {
      case 'SET_APPLIED_BASE_MODIFICATIONS': {
         const { name, value, operation } = action.payload
         const previousForModifier = state.appliedBaseModifications?.[name] ?? []
         const otherModifiersForModifier = previousForModifier.filter((m) => m.operation !== operation)
         return {
            ...state,
            appliedBaseModifications: {
               ...state.appliedBaseModifications,
               [name]: [...otherModifiersForModifier, { name, value, operation }],
            },
         }
      }

      case 'SET_APPLIED_PAIR_MODIFICATIONS': {
         return { ...state, appliedPairModifications: [action.payload] }
      }
      case 'RESET_APPLIED_BASE_MODIFICATIONS': {
         return { ...state, appliedBaseModifications: null }
      }
      case 'SET_UNLOCKED_LEVEL': {
         const unlockedLevel = Math.max(0, action.payload)
         return {
            ...state,
            unlockedLevel,
            pairChoices: keepUnlockedPairChoices(state.pairChoices, unlockedLevel),
            roleSlot: state.roleSlot && state.roleSlot.level <= unlockedLevel ? state.roleSlot : null,
         }
      }
      case 'CHOOSE_PAIR_OPTION': {
         const { level, optionXmlId } = action.payload
         const pairChoices = { ...state.pairChoices }
         if (optionXmlId === null) {
            delete pairChoices[level]
            return { ...state, pairChoices }
         }
         pairChoices[level] = optionXmlId
         return { ...state, pairChoices, unlockedLevel: Math.max(state.unlockedLevel, level) }
      }
      case 'CHOOSE_ROLE_SLOT': {
         const { level, category } = action.payload
         if (category === null) return { ...state, roleSlot: null }
         return {
            ...state,
            roleSlot: { level, category },
            unlockedLevel: Math.max(state.unlockedLevel, level),
         }
      }
      case 'RESET':
         return fieldModificationInitialState
      default:
         return state
   }
}

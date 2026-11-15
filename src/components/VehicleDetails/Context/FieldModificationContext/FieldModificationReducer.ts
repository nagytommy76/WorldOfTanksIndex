import type { IPairOption } from '@Models/FieldModifications/FieldModificationTypes'
import {
   fieldModificationInitialState,
   type IAppliedModifications,
   type IAppliedPairModifications,
   type IFieldModificationContextActions,
   type IFieldModificationReducerState,
} from './Types'

/**
 * @description Keeps the entries of the unlocked levels only (level I..unlockedLevel)
 */
function keepUnlockedLevels<T>(
   byLevel: Partial<Record<number, T>>,
   unlockedLevel: number,
): Partial<Record<number, T>> {
   return Object.fromEntries(Object.entries(byLevel).filter(([level]) => Number(level) <= unlockedLevel))
}

/**
 * @description The KPIs of a pair option grouped by name
 * @example
 * // improvedEnginePower
 * {
 *   vehicleEnginePower: [{ name: 'vehicleEnginePower', operation: 'mul', value: 1.03 }],
 *   vehicleForwardMaxSpeed: [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: -2 }],
 * }
 */
function toAppliedModifications(option: IPairOption): IAppliedModifications {
   const applied: IAppliedModifications = {}
   for (const { name, operation, value } of option.kpi) {
      ;(applied[name] ??= []).push({ name, operation, value })
   }
   return applied
}

/**
 * @returns null when no level has an applied pair modification
 */
function nullWhenEmpty(applied: IAppliedPairModifications): IAppliedPairModifications | null {
   return Object.keys(applied).length > 0 ? applied : null
}

export default function FieldModificationReducer(
   state: IFieldModificationReducerState,
   action: IFieldModificationContextActions,
): IFieldModificationReducerState {
   switch (action.type) {
      case 'SET_APPLIED_BASE_MODIFICATIONS': {
         return { ...state, appliedBaseModifications: action.payload }
      }
      case 'SET_APPLIED_PAIR_MODIFICATIONS': {
         return { ...state, appliedPairModifications: action.payload }
      }
      case 'RESET_APPLIED_BASE_MODIFICATIONS': {
         return { ...state, appliedBaseModifications: null }
      }
      case 'RESET_APPLIED_PAIR_MODIFICATIONS': {
         return { ...state, appliedPairModifications: null }
      }
      case 'SET_UNLOCKED_LEVEL': {
         const unlockedLevel = Math.max(0, action.payload)
         return {
            ...state,
            unlockedLevel,
            pairChoices: keepUnlockedLevels(state.pairChoices, unlockedLevel),
            appliedPairModifications: nullWhenEmpty(
               keepUnlockedLevels(state.appliedPairModifications ?? {}, unlockedLevel),
            ),
            roleSlot: state.roleSlot && state.roleSlot.level <= unlockedLevel ? state.roleSlot : null,
         }
      }
      case 'CHOOSE_PAIR_OPTION': {
         const { level, optionXmlId, foundOptionByXmlId } = action.payload
         const pairChoices = { ...state.pairChoices }
         // One entry per level: writing the level replaces the other option of the pair
         const appliedPairModifications: IAppliedPairModifications = { ...state.appliedPairModifications }

         if (optionXmlId === null) {
            delete pairChoices[level]
            delete appliedPairModifications[level]
            return { ...state, pairChoices, appliedPairModifications: nullWhenEmpty(appliedPairModifications) }
         }

         pairChoices[level] = optionXmlId
         if (foundOptionByXmlId) appliedPairModifications[level] = toAppliedModifications(foundOptionByXmlId)
         else delete appliedPairModifications[level]

         return {
            ...state,
            pairChoices,
            appliedPairModifications: nullWhenEmpty(appliedPairModifications),
            unlockedLevel: Math.max(state.unlockedLevel, level),
         }
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

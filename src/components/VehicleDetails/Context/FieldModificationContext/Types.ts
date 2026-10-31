/**
 * @param level Level of the roleSlot feature step (VI in the current trees)
 * @param category The chosen category, one of the vehicle's customRoleSlotOptions, e.g. 'stealth'
 */
export interface IFieldModificationRoleSlot {
   level: number
   category: string
}

/**
 * @param unlockedLevel 0 = nothing unlocked, n = levels I..n are unlocked (their main steps are researched)
 * @param pairChoices level → xmlId of the chosen pair option, e.g. { 2: 4011, 4: 4022 }
 * @param roleSlot The chosen role slot category, null when nothing is chosen
 */
export interface IFieldModificationReducerState {
   unlockedLevel: number
   pairChoices: Partial<Record<number, number>>
   roleSlot: IFieldModificationRoleSlot | null
}

/**
 * - SET_UNLOCKED_LEVEL: sets the unlocked level, the choices above it are dropped
 * - CHOOSE_PAIR_OPTION: chooses a pair option (null clears it), choosing unlocks every level up to it
 * - CHOOSE_ROLE_SLOT: chooses a role slot category (null clears it), choosing unlocks every level up to it
 * - RESET: nothing unlocked, nothing chosen
 */
export type IFieldModificationContextActions =
   | { type: 'SET_UNLOCKED_LEVEL'; payload: number }
   | { type: 'CHOOSE_PAIR_OPTION'; payload: { level: number; optionXmlId: number | null } }
   | { type: 'CHOOSE_ROLE_SLOT'; payload: { level: number; category: string | null } }
   | { type: 'RESET' }

export const fieldModificationInitialState: IFieldModificationReducerState = {
   unlockedLevel: 0,
   pairChoices: {},
   roleSlot: null,
}

export interface IFieldModificationContext {
   fieldModReducer: IFieldModificationReducerState
   fieldModDispatch: React.Dispatch<IFieldModificationContextActions>
}

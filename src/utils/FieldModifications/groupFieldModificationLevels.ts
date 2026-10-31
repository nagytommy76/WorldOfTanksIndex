import type { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'

/**
 * @param level Depth in the tree: 1 (I) → 8 (VIII)
 * @param mainStep The step that unlocks the level: a 'feature' (e.g. roleSlot) or a base 'modification'
 * @param pairStep The optional 'pair_modification' step of the level: two mutually exclusive setups
 */
export interface IFieldModificationLevel {
   level: number
   mainStep: IResolvedTreeStep | null
   pairStep: IResolvedTreeStep | null
}

/**
 * @description Groups the resolved tree steps by level, sorted from level I upwards.
 * Every current tree has one main step per level, plus a pair step on the base modification levels.
 * @example
 * // level 2 of a tier X tree
 * { level: 2, mainStep: { action: { type: 'modification', ... } }, pairStep: { action: { type: 'pair_modification', ... } } }
 */
export function groupFieldModificationLevels(steps: IResolvedTreeStep[]): IFieldModificationLevel[] {
   const levels = new Map<number, IFieldModificationLevel>()

   for (const step of steps) {
      const level = levels.get(step.level) ?? { level: step.level, mainStep: null, pairStep: null }
      if (step.action.type === 'pair_modification') level.pairStep = step
      else level.mainStep = step
      levels.set(step.level, level)
   }

   return [...levels.values()].sort((first, second) => first.level - second.level)
}

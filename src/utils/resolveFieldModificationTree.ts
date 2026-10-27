import type { FieldModificationTreeInput, IResolvedFieldModificationTree } from '@Models/FieldModifications/TreeTypes'
import type { IFieldModification } from '@Models/FieldModifications/FieldModificationTypes'
import type { ITierPrice } from '@Models/FieldModifications/price.types'

/**
 * @description Filters the tree to the given vehicle tier and joins every step with its
 * modification document and its tier price
 * @param tree Lean field modification tree document
 * @param modifications Base & pair documents referenced by the tree steps (step.action.value === key)
 * @param prices Price documents referenced by the tree steps (step.price === key)
 * @param tier Vehicle tier
 */
export function resolveFieldModificationTree(
   tree: FieldModificationTreeInput,
   modifications: IFieldModification[],
   prices: { key: string; prices: ITierPrice[] }[],
   tier: number,
): IResolvedFieldModificationTree {
   const modificationsByKey = new Map(modifications.map((modification) => [modification.key, modification]))
   const pricesByKey = new Map(prices.map((price) => [price.key, price.prices]))

   const availableSteps = tree.steps.filter(
      (step) => !step.tierRange || (tier >= step.tierRange.min && tier <= step.tierRange.max),
   )
   const availableStepIds = new Set(availableSteps.map((step) => step.id))

   const steps = availableSteps.map((step) => {
      const tierPrice = pricesByKey.get(step.price)?.find((price) => price.tier === tier)

      return {
         ...step,
         // drop pointers to steps that are not available on this tier
         unlocks: step.unlocks.filter((stepId) => availableStepIds.has(stepId)),
         modification: step.action.type === 'feature' ? null : (modificationsByKey.get(step.action.value) ?? null),
         cost: tierPrice ? { amount: tierPrice.amount, currency: tierPrice.currency } : null,
      }
   })

   return {
      role: tree.role,
      xmlId: tree.xmlId,
      rootStep: tree.rootStep,
      steps,
   }
}

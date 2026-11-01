import { useContext, useMemo } from 'react'
import { FieldModificationContext } from '@/VehicleContext/FieldModificationContext/FieldModificationContext'
import type { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'

function ReturnStepCost(steps: IResolvedTreeStep[] | undefined, currency: 'credits' | 'xp') {
   return steps?.find((step) => {
      if (step.cost?.currency === currency) return step.cost
   })?.cost?.amount
}

export default function useCosts(steps: IResolvedTreeStep[] | undefined) {
   const {
      fieldModReducer: { unlockedLevel, pairChoices },
   } = useContext(FieldModificationContext)

   const foundCreditsCost = useMemo(() => {
      return ReturnStepCost(steps, 'credits')
   }, [steps])

   const foundXPCost = useMemo(() => {
      return ReturnStepCost(steps, 'xp')
   }, [steps])

   const XPCost = useMemo(() => foundXPCost && foundXPCost * unlockedLevel, [foundXPCost, unlockedLevel]) || 0
   const CreditsCost =
      useMemo(
         () => foundCreditsCost && foundCreditsCost * Object.keys(pairChoices).length,
         [foundCreditsCost, pairChoices],
      ) || 0

   return { CreditsCost, XPCost }
}

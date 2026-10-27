import { resolveFieldModificationTree } from '@/utils/resolveFieldModificationTree'
import type { IFieldModification } from '@Models/FieldModifications/FieldModificationTypes'
import {
   MockFieldModificationTree,
   MockBaseModifications,
   MockPairModification,
   MockFieldModificationPrices,
} from '@/__tests__/mocks/FieldModifications'

const modifications = [
   ...MockBaseModifications.map((modification) => ({ ...modification, kind: 'base' })),
   { ...MockPairModification, kind: 'pair' },
] as unknown as IFieldModification[]

const resolve = (tier: number) =>
   resolveFieldModificationTree(MockFieldModificationTree, modifications, MockFieldModificationPrices, tier)

describe('resolveFieldModificationTree', () => {
   it('should return every step on tier 10', () => {
      const { steps } = resolve(10)
      expect(steps.map((step) => step.id)).toEqual([1, 2, 3, 4])
   })

   it('should drop tier-restricted steps and prune unlocks on tier 8', () => {
      const { steps } = resolve(8)
      expect(steps.map((step) => step.id)).toEqual([1, 2, 3])
      expect(steps.find((step) => step.id === 2)?.unlocks).toEqual([3])
      expect(steps.find((step) => step.id === 3)?.unlocks).toEqual([])
   })

   it('should only keep steps without tierRange below tier 8', () => {
      const { steps } = resolve(7)
      expect(steps.map((step) => step.id)).toEqual([1, 2])
      expect(steps.find((step) => step.id === 2)?.unlocks).toEqual([])
   })

   it('should join base and pair modifications, feature step gets null', () => {
      const { steps } = resolve(10)
      expect(steps[0].modification).toBeNull()
      expect(steps[1].modification?.key).toBe('role_LT_universal_base_1')
      expect(steps[2].modification?.kind).toBe('pair')
      expect(steps[3].modification?.key).toBe('role_LT_universal_base_2')
   })

   it('should resolve the cost for the requested tier', () => {
      const { steps } = resolve(9)
      expect(steps[1].cost).toEqual({ amount: 20000, currency: 'xp' })
      expect(steps[2].cost).toEqual({ amount: 0, currency: 'credits' })
   })

   it('should return null cost when the tier has no price', () => {
      const { steps } = resolve(5)
      expect(steps.every((step) => step.cost === null)).toBe(true)
   })

   it('should return null modification when the key is not found', () => {
      const { steps } = resolveFieldModificationTree(MockFieldModificationTree, [], MockFieldModificationPrices, 10)
      expect(steps[1].modification).toBeNull()
   })
})

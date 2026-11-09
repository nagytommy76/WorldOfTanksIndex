import { groupFieldModificationLevels } from '@/src/utils/FieldModifications/groupFieldModificationLevels'
import { resolveFieldModificationTree } from '@/src/utils/FieldModifications/resolveFieldModificationTree'
import { MockResolvedScoutTree } from '@/__tests__/mocks/FieldModificationTreeResolved'
import { MockFieldModificationTree, MockFieldModificationPrices } from '@/__tests__/mocks/FieldModifications'

describe('groupFieldModificationLevels', () => {
   it('should return one entry per level, from level I upwards', () => {
      const levels = groupFieldModificationLevels(MockResolvedScoutTree.steps)
      expect(levels.map((level) => level.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
   })

   it('should put the base modification and the pair of a level together', () => {
      const levelTwo = groupFieldModificationLevels(MockResolvedScoutTree.steps)[1]
      expect(levelTwo.mainStep?.action).toEqual({ type: 'modification', value: 'role_LT_scout_base_1' })
      expect(levelTwo.pairStep?.action).toEqual({ type: 'pair_modification', value: 'role_lightTank_pair_1' })
   })

   it('should keep the feature levels without a pair', () => {
      const levelSix = groupFieldModificationLevels(MockResolvedScoutTree.steps)[5]
      expect(levelSix.mainStep?.action).toEqual({ type: 'feature', value: 'roleSlot' })
      expect(levelSix.pairStep).toBeNull()
   })

   it('should sort steps that come in any order', () => {
      const levels = groupFieldModificationLevels([...MockResolvedScoutTree.steps].reverse())
      expect(levels.map((level) => level.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
      expect(levels[1].mainStep?.id).toBe(2)
      expect(levels[1].pairStep?.id).toBe(401)
   })

   it('should leave mainStep empty on a level that only has a pair', () => {
      const tree = resolveFieldModificationTree(
         MockFieldModificationTree,
         [],
         MockFieldModificationPrices,
         10,
      )
      const pairOnlyLevel = groupFieldModificationLevels(tree.steps).find((level) => level.level === 6)
      expect(pairOnlyLevel?.mainStep).toBeNull()
      expect(pairOnlyLevel?.pairStep?.id).toBe(3)
   })
})

import { collectBaseModifications } from '@/src/utils/FieldModifications/collectBaseModifications'
import {
   groupFieldModificationLevels,
   type IFieldModificationLevel,
} from '@/src/utils/FieldModifications/groupFieldModificationLevels'
import { MockResolvedScoutTree } from '@/__tests__/mocks/FieldModificationTreeResolved'

import type { IModifierOp } from '@Models/FieldModifications/FieldModificationTypes'

const scoutLevels = groupFieldModificationLevels(MockResolvedScoutTree.steps)

/**
 * A level with a base modification main step, only the fields collectBaseModifications reads.
 * The modification interfaces extend Document, so the plain object needs a cast
 */
function baseLevel(level: number, kpi: IModifierOp[]): IFieldModificationLevel {
   return {
      level,
      mainStep: { level, modification: { kind: 'base', kpi } },
      pairStep: null,
   } as unknown as IFieldModificationLevel
}

function featureLevel(level: number): IFieldModificationLevel {
   return { level, mainStep: { level, modification: null }, pairStep: null } as unknown as IFieldModificationLevel
}

describe('collectBaseModifications', () => {
   it('should return null when nothing is unlocked', () => {
      expect(collectBaseModifications(scoutLevels, 0)).toBeNull()
   })

   it('should return null when the unlocked levels have no base modification', () => {
      // Level I of the scout tree is a feature
      expect(collectBaseModifications(scoutLevels, 1)).toBeNull()
      expect(collectBaseModifications([featureLevel(1), featureLevel(2)], 2)).toBeNull()
   })

   it('should collect the base modifications of every unlocked level', () => {
      expect(Object.keys(collectBaseModifications(scoutLevels, 8) ?? {})).toEqual([
         'vehicleAllGroundRotationSpeed',
         'vehicleGunShotDispersionChassisMovement',
         'vehicleChassisStrength',
         'vehicleInvisibilityAfterShot',
         'vehicleSpeedGain',
      ])
   })

   it('should only keep the levels up to the unlocked one after going back from level VIII to II', () => {
      collectBaseModifications(scoutLevels, 8)
      expect(collectBaseModifications(scoutLevels, 2)).toEqual({
         vehicleAllGroundRotationSpeed: [
            { name: 'vehicleAllGroundRotationSpeed', operation: 'mul', value: 1.02 },
         ],
      })
   })

   it('should not count the pair options as base modifications', () => {
      const applied = collectBaseModifications(scoutLevels, 2)
      expect(applied).not.toHaveProperty('vehicleEnginePower')
      expect(applied).not.toHaveProperty('vehicleForwardMaxSpeed')
   })

   it('should add up the percentages of the same mul KPI on more levels', () => {
      const levels = [
         baseLevel(1, [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.02 }]),
         baseLevel(2, [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.03 }]),
      ]
      const [speedGain] = collectBaseModifications(levels, 2)?.vehicleSpeedGain ?? []
      expect(speedGain.operation).toBe('mul')
      expect(speedGain.value).toBeCloseTo(1.05)
   })

   it('should sum the terms of the same add KPI on more levels', () => {
      const levels = [
         baseLevel(1, [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: 5 }]),
         baseLevel(2, [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: 5 }]),
      ]
      expect(collectBaseModifications(levels, 2)?.vehicleForwardMaxSpeed).toEqual([
         { name: 'vehicleForwardMaxSpeed', operation: 'add', value: 10 },
      ])
   })

   it('should keep the mul and add operations of the same KPI apart', () => {
      const levels = [
         baseLevel(1, [{ name: 'vehicleForwardMaxSpeed', operation: 'mul', value: 1.02 }]),
         baseLevel(2, [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: 2 }]),
      ]
      expect(collectBaseModifications(levels, 2)?.vehicleForwardMaxSpeed).toEqual([
         { name: 'vehicleForwardMaxSpeed', operation: 'mul', value: 1.02 },
         { name: 'vehicleForwardMaxSpeed', operation: 'add', value: 2 },
      ])
   })

   it('should not change the level objects it reads', () => {
      const levels = [
         baseLevel(1, [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.02 }]),
         baseLevel(2, [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.03 }]),
      ]
      collectBaseModifications(levels, 2)
      collectBaseModifications(levels, 2)
      expect(levels[0].mainStep?.modification).toEqual({
         kind: 'base',
         kpi: [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.02 }],
      })
   })
})

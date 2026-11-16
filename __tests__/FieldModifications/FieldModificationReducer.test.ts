import FieldModificationReducer from '@/VehicleContext/FieldModificationContext/FieldModificationReducer'
import {
   fieldModificationInitialState,
   type IFieldModificationReducerState,
} from '@/VehicleContext/FieldModificationContext/Types'
import type { IPairOption } from '@Models/FieldModifications/FieldModificationTypes'

const chosenState: IFieldModificationReducerState = {
   unlockedLevel: 8,
   pairChoices: { 2: 4011, 4: 4022, 7: 4341 },
   roleSlot: { level: 6, category: 'stealth' },
   appliedBaseModifications: null,
   appliedPairModifications: null,
}

describe('FieldModificationReducer', () => {
   it('should drop the choices above the new unlocked level', () => {
      const state = FieldModificationReducer(chosenState, { type: 'SET_UNLOCKED_LEVEL', payload: 5 })
      expect(state).toEqual({
         unlockedLevel: 5,
         pairChoices: { 2: 4011, 4: 4022 },
         roleSlot: null,
         appliedBaseModifications: null,
         appliedPairModifications: null,
      })
   })

   it('should keep every choice when the unlocked level goes up', () => {
      const state = FieldModificationReducer(
         { ...chosenState, unlockedLevel: 7 },
         { type: 'SET_UNLOCKED_LEVEL', payload: 8 },
      )
      expect(state.pairChoices).toEqual(chosenState.pairChoices)
      expect(state.roleSlot).toEqual(chosenState.roleSlot)
   })

   it('should unlock every level up to a chosen pair option', () => {
      const state = FieldModificationReducer(fieldModificationInitialState, {
         type: 'CHOOSE_PAIR_OPTION',
         payload: { level: 4, optionXmlId: 4021 },
      })
      expect(state).toEqual({
         unlockedLevel: 4,
         pairChoices: { 4: 4021 },
         roleSlot: null,
         appliedBaseModifications: null,
         appliedPairModifications: null,
      })
   })

   it('should not lock levels when choosing below the unlocked level', () => {
      const state = FieldModificationReducer(chosenState, {
         type: 'CHOOSE_PAIR_OPTION',
         payload: { level: 2, optionXmlId: 4012 },
      })
      expect(state.unlockedLevel).toBe(8)
      expect(state.pairChoices).toEqual({ 2: 4012, 4: 4022, 7: 4341 })
   })

   it('should clear a pair choice with null', () => {
      const state = FieldModificationReducer(chosenState, {
         type: 'CHOOSE_PAIR_OPTION',
         payload: { level: 4, optionXmlId: null },
      })
      expect(state.pairChoices).toEqual({ 2: 4011, 7: 4341 })
      expect(state.unlockedLevel).toBe(8)
   })

   it('should choose and clear the role slot category', () => {
      const chosen = FieldModificationReducer(fieldModificationInitialState, {
         type: 'CHOOSE_ROLE_SLOT',
         payload: { level: 6, category: 'survivability' },
      })
      expect(chosen.unlockedLevel).toBe(6)
      expect(chosen.roleSlot).toEqual({ level: 6, category: 'survivability' })

      const cleared = FieldModificationReducer(chosen, {
         type: 'CHOOSE_ROLE_SLOT',
         payload: { level: 6, category: null },
      })
      expect(cleared.roleSlot).toBeNull()
      expect(cleared.unlockedLevel).toBe(6)
   })

   it('should replace the applied base modifications instead of merging them', () => {
      const levelEight = FieldModificationReducer(fieldModificationInitialState, {
         type: 'SET_APPLIED_BASE_MODIFICATIONS',
         payload: {
            vehicleAllGroundRotationSpeed: [
               { name: 'vehicleAllGroundRotationSpeed', operation: 'mul', value: 1.02 },
            ],
            vehicleSpeedGain: [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.03 }],
         },
      })
      const levelTwo = FieldModificationReducer(levelEight, {
         type: 'SET_APPLIED_BASE_MODIFICATIONS',
         payload: {
            vehicleAllGroundRotationSpeed: [
               { name: 'vehicleAllGroundRotationSpeed', operation: 'mul', value: 1.02 },
            ],
         },
      })
      expect(levelTwo.appliedBaseModifications).toEqual({
         vehicleAllGroundRotationSpeed: [
            { name: 'vehicleAllGroundRotationSpeed', operation: 'mul', value: 1.02 },
         ],
      })

      const nothing = FieldModificationReducer(levelTwo, {
         type: 'SET_APPLIED_BASE_MODIFICATIONS',
         payload: null,
      })
      expect(nothing.appliedBaseModifications).toBeNull()
   })

   describe('applied pair modifications', () => {
      const improvedEnginePower: IPairOption = {
         xmlId: 4011,
         imgName: 'improvedEnginePower',
         displayName: 'Valves Tuning (Setup 1)',
         modifiers: [],
         kpi: [
            { operation: 'mul', name: 'vehicleEnginePower', value: 1.03 },
            { operation: 'add', name: 'vehicleForwardMaxSpeed', value: -2 },
         ],
      }
      const improvedSpeedIndicator: IPairOption = {
         xmlId: 4012,
         imgName: 'improvedSpeedIndicator',
         displayName: 'Valves Tuning (Setup 2)',
         modifiers: [],
         kpi: [
            { operation: 'mul', name: 'vehicleEnginePower', value: 0.97 },
            { operation: 'add', name: 'vehicleForwardMaxSpeed', value: 2 },
         ],
      }
      const levelFourOption: IPairOption = {
         xmlId: 4021,
         imgName: 'improvedRotation',
         displayName: 'Level IV setup 1',
         modifiers: [],
         kpi: [{ operation: 'mul', name: 'vehicleAllGroundRotationSpeed', value: 1.05 }],
      }

      const choose = (state: IFieldModificationReducerState, level: number, option: IPairOption | null) =>
         FieldModificationReducer(state, {
            type: 'CHOOSE_PAIR_OPTION',
            payload: { level, optionXmlId: option?.xmlId ?? null, foundOptionByXmlId: option ?? undefined },
         })

      it('should apply the KPIs of the chosen option on its level', () => {
         const state = choose(fieldModificationInitialState, 2, improvedEnginePower)
         expect(state.appliedPairModifications).toEqual({
            2: {
               vehicleEnginePower: [{ name: 'vehicleEnginePower', operation: 'mul', value: 1.03 }],
               vehicleForwardMaxSpeed: [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: -2 }],
            },
         })
      })

      it('should replace the other option of the same pair instead of merging', () => {
         const first = choose(fieldModificationInitialState, 2, improvedEnginePower)
         const switched = choose(first, 2, improvedSpeedIndicator)
         expect(switched.pairChoices).toEqual({ 2: 4012 })
         expect(switched.appliedPairModifications).toEqual({
            2: {
               vehicleEnginePower: [{ name: 'vehicleEnginePower', operation: 'mul', value: 0.97 }],
               vehicleForwardMaxSpeed: [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: 2 }],
            },
         })
      })

      it('should keep the chosen options of the other levels', () => {
         const state = choose(choose(fieldModificationInitialState, 2, improvedEnginePower), 4, levelFourOption)
         expect(Object.keys(state.appliedPairModifications ?? {})).toEqual(['2', '4'])
      })

      it('should remove the level when the choice is cleared, null when nothing is left', () => {
         const both = choose(choose(fieldModificationInitialState, 2, improvedEnginePower), 4, levelFourOption)
         const levelTwoOnly = choose(both, 4, null)
         expect(Object.keys(levelTwoOnly.appliedPairModifications ?? {})).toEqual(['2'])

         const nothing = choose(levelTwoOnly, 2, null)
         expect(nothing.appliedPairModifications).toBeNull()
      })

      it('should drop the applied pair modifications above the new unlocked level', () => {
         const both = choose(choose(fieldModificationInitialState, 2, improvedEnginePower), 4, levelFourOption)
         const levelThree = FieldModificationReducer(both, { type: 'SET_UNLOCKED_LEVEL', payload: 3 })
         expect(Object.keys(levelThree.appliedPairModifications ?? {})).toEqual(['2'])

         const levelOne = FieldModificationReducer(levelThree, { type: 'SET_UNLOCKED_LEVEL', payload: 1 })
         expect(levelOne.appliedPairModifications).toBeNull()
      })

      it('should reset the applied pair modifications', () => {
         const state = choose(fieldModificationInitialState, 2, improvedEnginePower)
         const reset = FieldModificationReducer(state, { type: 'RESET_APPLIED_PAIR_MODIFICATIONS' })
         expect(reset.appliedPairModifications).toBeNull()
         expect(reset.pairChoices).toEqual({ 2: 4011 })
      })
   })

   it('should reset to the initial state', () => {
      expect(FieldModificationReducer(chosenState, { type: 'RESET' })).toEqual(fieldModificationInitialState)
   })
})

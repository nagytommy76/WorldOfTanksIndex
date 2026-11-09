import FieldModificationReducer from '@/VehicleContext/FieldModificationContext/FieldModificationReducer'
import {
   fieldModificationInitialState,
   type IFieldModificationReducerState,
} from '@/VehicleContext/FieldModificationContext/Types'

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

   it('should reset to the initial state', () => {
      expect(FieldModificationReducer(chosenState, { type: 'RESET' })).toEqual(fieldModificationInitialState)
   })
})

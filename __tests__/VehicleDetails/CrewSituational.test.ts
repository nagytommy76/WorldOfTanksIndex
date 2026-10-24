import CrewReducer from '@/CrewContext/CrewReducer'
import Commander from '@/CrewContext/Classes/Commander'
import CrewMember from '@/CrewContext/Classes/Crew'
import { initialCrewMembers, type ICrewReducerState } from '@/CrewContext/Types'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewTransformer from '@/utils/ApplyCrewModifiers'

const STAY_SHARP = { name: 'commander_staySharp', value: 1.05, situationalParam: true }
const BROTHERHOOD = { name: 'brotherhood', value: 1.05 }

function createCrewState(): ICrewReducerState {
   const commander = new Commander({ primaryRole: 'commander', secondaryRole: [] })
   const loader = new CrewMember({ primaryRole: 'loader', secondaryRole: [] })
   loader.applyCommanderBonus()

   return { commander, crewMembers: { ...initialCrewMembers, loader } }
}

/**
 * @description Degressive crew formula: nominal * 0.875 / (0.00375 * efficiency + 0.5)
 */
function expectedReload(baseReload: number, loaderEfficiency: number) {
   return (baseReload * 0.875) / (0.00375 * loaderEfficiency + 0.5)
}

function calculateReload(state: ICrewReducerState) {
   return applyStatPipeline({ reloadTime: 7.8 }, [createCrewTransformer(state.commander, state.crewMembers)])
      .reloadTime
}

describe('Situational crew modifiers (commander_staySharp)', () => {
   it('should not change efficiency while the situational switch is off', () => {
      const state = CrewReducer(createCrewState(), { type: 'SET_APPLIED_CREW_MODIFIER', payload: STAY_SHARP })

      expect(state.commander.efficiencyLevel).toBeCloseTo(100)
      expect(state.crewMembers.loader?.efficiencyLevel).toBeCloseTo(110)
      expect(calculateReload(state)).toBeCloseTo(expectedReload(7.8, 110), 4)
   })

   it('should add 5% crew level when the situational switch is turned on', () => {
      let state = CrewReducer(createCrewState(), { type: 'SET_APPLIED_CREW_MODIFIER', payload: STAY_SHARP })
      state = CrewReducer(state, { type: 'SET_SITUATIONAL_ACTIVE', payload: true })

      expect(state.commander.efficiencyLevel).toBeCloseTo(105)
      expect(state.crewMembers.loader?.efficiencyLevel).toBeCloseTo(115.5)
      expect(calculateReload(state)).toBeCloseTo(expectedReload(7.8, 115.5), 4)
   })

   it('should revert efficiency when the situational switch is turned off again', () => {
      let state = CrewReducer(createCrewState(), { type: 'SET_APPLIED_CREW_MODIFIER', payload: STAY_SHARP })
      state = CrewReducer(state, { type: 'SET_SITUATIONAL_ACTIVE', payload: true })
      state = CrewReducer(state, { type: 'SET_SITUATIONAL_ACTIVE', payload: false })

      expect(state.commander.efficiencyLevel).toBeCloseTo(100)
      expect(state.crewMembers.loader?.efficiencyLevel).toBeCloseTo(110)
   })

   it('should apply stay sharp when it is selected while the switch is already on', () => {
      let state = CrewReducer(createCrewState(), { type: 'SET_SITUATIONAL_ACTIVE', payload: true })
      state = CrewReducer(state, { type: 'SET_APPLIED_CREW_MODIFIER', payload: STAY_SHARP })

      expect(state.commander.efficiencyLevel).toBeCloseTo(105)
      expect(state.crewMembers.loader?.efficiencyLevel).toBeCloseTo(115.5)
   })

   it('should always apply non-situational modifiers (brotherhood) next to stay sharp', () => {
      let state = CrewReducer(createCrewState(), { type: 'SET_APPLIED_CREW_MODIFIER', payload: BROTHERHOOD })
      state = CrewReducer(state, { type: 'SET_APPLIED_CREW_MODIFIER', payload: STAY_SHARP })

      expect(state.commander.efficiencyLevel).toBeCloseTo(105)
      expect(state.crewMembers.loader?.efficiencyLevel).toBeCloseTo(115.5)

      state = CrewReducer(state, { type: 'SET_SITUATIONAL_ACTIVE', payload: true })

      expect(state.commander.efficiencyLevel).toBeCloseTo(110)
      expect(state.crewMembers.loader?.efficiencyLevel).toBeCloseTo(121)
   })

   it('should return a new crewMembers reference so consumers re-render', () => {
      const initialState = createCrewState()
      const state = CrewReducer(initialState, { type: 'SET_SITUATIONAL_ACTIVE', payload: true })

      expect(state.crewMembers).not.toBe(initialState.crewMembers)
   })
})

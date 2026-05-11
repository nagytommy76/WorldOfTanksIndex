import type { ICrewReducerState, ICrewContextActions } from './Types'

export default function CrewReducer(
   state: ICrewReducerState,
   action: ICrewContextActions,
): ICrewReducerState {
   switch (action.type) {
      case 'TOGGLE_CREW_MODE':
         for (const [role, member] of Object.entries(state.crewMembers)) {
            if (!member) continue
            if (role === 'commander' && action.payload) continue
            if (action.payload) {
               member.setAppliedCrewModifier({
                  name: 'commanderBonus',
                  paramName: 'commanderBonus',
                  value: 0.1,
               })
            } else {
               member.removeAppliedCrewModifier('commanderBonus')
            }
         }
         return {
            ...state,
            crewMode: state.crewMode === 'base' ? 'effective' : 'base',
         }
      case 'SET_APPLIED_CREW_MODIFIER':
         return state
      case 'ADD_INITIAL_CREW':
         return {
            ...state,
            crewMembers: action.payload,
         }

      default:
         return state
   }
}

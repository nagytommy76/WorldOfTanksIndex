import type { ICrewReducerState, ICrewContextActions } from './Types'

export default function CrewReducer(
   state: ICrewReducerState,
   action: ICrewContextActions,
): ICrewReducerState {
   switch (action.type) {
      case 'TOGGLE_CREW_MODE':
         for (const [role, member] of Object.entries(state.crewMembers)) {
            if (!member) continue

            const newEfficiencyLevel = member.computeEfficiencyLevel([], state.crewMode === 'base')
            // console.log('ROLE: ', role)
            // console.log(role, newEfficiencyLevel)
            member.efficiencyLevel = newEfficiencyLevel
         }
         return {
            ...state,
            crewMode: state.crewMode === 'base' ? 'effective' : 'base',
         }
      case 'ADD_INITIAL_CREW':
         return {
            ...state,
            crewMembers: action.payload,
         }

      default:
         return state
   }
}

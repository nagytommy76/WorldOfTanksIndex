import type { ICrewReducerState, ICrewContextActions } from './Types'

export default function CrewReducer(
   state: ICrewReducerState,
   action: ICrewContextActions,
): ICrewReducerState {
   switch (action.type) {
      case 'TOGGLE_CREW_MODE':
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

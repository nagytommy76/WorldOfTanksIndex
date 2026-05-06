import type { ICrewRoles } from '@/types/VehicleDetails/Crew'
import CrewMember from './Classes/Crew'

/** Whether to show raw XML values or crew-formula-adjusted values */
export type CrewMode = 'base' | 'effective'

/**
 * Determines which direction is "better" for the crew formula.
 * degressive: lower is better (reload time, aim time)
 * progressive: higher is better (view range, traverse speed)
 */
export type CrewStatType = 'degressive' | 'progressive'

/** Per-field config: stat type + which crew role's efficiency drives it */
// export interface ICrewStatConfig {
//    type: CrewStatType
//    /** The primaryRole of the crew member whose efficiency drives this stat */
//    role: ICrewRoles
// }

export type CrewMembersType = {
   [crewRole in ICrewRoles]: CrewMember | undefined
}

export interface ICrewReducerState {
   crewMode: CrewMode
   crewMembers: CrewMembersType
}

export const initialCrewMembers = {
   commander: undefined,
   gunner: undefined,
   driver: undefined,
   loader: undefined,
   radioman: undefined,
}

export const crewInitialState: ICrewReducerState = {
   crewMode: 'effective',
   crewMembers: initialCrewMembers,
}

export type ICrewContextActions =
   | { type: 'TOGGLE_CREW_MODE' }
   | { type: 'ADD_INITIAL_CREW'; payload: CrewMembersType }

export interface ICrewContext {
   crewReducer: ICrewReducerState
   crewDispatch: React.Dispatch<ICrewContextActions>
}

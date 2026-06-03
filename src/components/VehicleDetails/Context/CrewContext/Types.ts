// import type { ICrewRoles } from '@/types/VehicleDetails/Crew'
import CrewMember from './Classes/Crew'
import type { MeasureType, ICrewRoles } from '@/Classes/CrewSkills'

/** Whether to show raw XML values or crew-formula-adjusted values */
export type CrewMode = 'base' | 'effective'

/**
 * Determines which direction is "better" for the crew formula.
 * degressive: lower is better (reload time, aim time)
 * progressive: higher is better (view range, traverse speed)
 */
export type CrewStatType = 'degressive' | 'progressive'

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
   | { type: 'TOGGLE_COMMANDER_BONUS'; payload: boolean }
   | { type: 'ADD_INITIAL_CREW'; payload: CrewMembersType }
   | { type: 'CLEAR_APPLIED_CREW_MODIFIERS' }
   | { type: 'REMOVE_APPLIED_CREW_MODIFIER'; payload: string }
   | {
        type: 'SET_APPLIED_CREW_MODIFIER'
        payload: { name: string; value: number }
     }
   | {
        type: 'SET_APPLIED_CREW_SKILLS'
        payload: {
           appliedSkillName: string
           role: ICrewRoles | undefined
           crewSkillModifiers: {
              situationalParam: boolean
              value: number
              paramName: string
              measureType: MeasureType
           }[]
        }
     }
   | { type: 'REMOVE_APPLIED_CREW_SKILLS'; payload: { skillName: string; crewRole: ICrewRoles | undefined } }

export interface ICrewContext {
   crewReducer: ICrewReducerState
   crewDispatch: React.Dispatch<ICrewContextActions>
}

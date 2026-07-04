import Commander from './Classes/Commander'
import CrewMember from './Classes/Crew'
import type { Dispatch, SetStateAction } from 'react'
import type { MeasureType, ICrewRoles, IRolesNonCommander } from '@/Classes/CrewSkills'

/**
 * Determines which direction is "better" for the crew formula.
 * degressive: lower is better (reload time, aim time)
 * progressive: higher is better (view range, traverse speed)
 */
export type CrewStatType = 'degressive' | 'progressive'

export type CrewMembersType = {
   [crewRole in IRolesNonCommander]: CrewMember | undefined
}

export interface ICrewReducerState {
   crewMembers: CrewMembersType
   commander: Commander
}

export const initialCrewMembers: CrewMembersType = {
   gunner: undefined,
   driver: undefined,
   loader: undefined,
   radioman: undefined,
}

export const crewInitialState: ICrewReducerState = {
   crewMembers: initialCrewMembers,
   commander: new Commander({ primaryRole: 'commander', secondaryRole: [] }),
}

export type ICrewContextActions =
   | { type: 'SET_COMMANDER'; payload: Commander }
   | { type: 'TOGGLE_COMMANDER_BONUS'; payload: { checked: boolean; commanderEfficiency: number } }
   | { type: 'ADD_INITIAL_CREW'; payload: CrewMembersType }
   | { type: 'REMOVE_APPLIED_CREW_MODIFIER'; payload: string }
   | {
        type: 'SET_APPLIED_CREW_MODIFIER'
        payload: { name: string; value: number }
     }
   | {
        type: 'SET_APPLIED_CREW_SKILLS'
        payload: {
           appliedSkillName: string
           role: ICrewRoles | IRolesNonCommander | undefined
           crewSkillModifiers: {
              situationalParam: boolean
              value: number
              paramName: string
              measureType: MeasureType
           }[]
        }
     }
   | {
        type: 'REMOVE_APPLIED_CREW_SKILLS'
        payload: { skillName: string; crewRole: ICrewRoles | IRolesNonCommander | undefined }
     }

export interface ICrewContext {
   crewReducer: ICrewReducerState
   crewDispatch: React.Dispatch<ICrewContextActions>
   isCalculateSituational: boolean
   setIsCalculateSituational: Dispatch<SetStateAction<boolean>>
}

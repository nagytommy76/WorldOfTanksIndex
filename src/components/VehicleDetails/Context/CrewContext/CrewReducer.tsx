import type { ICrewReducerState, ICrewContextActions } from './Types'

export default function CrewReducer(
   state: ICrewReducerState,
   action: ICrewContextActions,
): ICrewReducerState {
   switch (action.type) {
      case 'TOGGLE_COMMANDER_BONUS':
         const newToggleCrewMembers = state.crewMembers
         for (const [role, member] of Object.entries(newToggleCrewMembers)) {
            if (!member) continue
            if (role === 'commander' && action.payload) continue
            if (action.payload) {
               member.setAppliedCrewModifier({
                  name: 'commanderBonus',
                  paramName: 'commanderBonus',
                  value: 1.1,
               })
            } else {
               member.removeAppliedCrewModifier('commanderBonus')
            }
         }

         return {
            ...state,
            crewMembers: { ...newToggleCrewMembers },
            crewMode: state.crewMode === 'base' ? 'effective' : 'base',
         }
      case 'SET_APPLIED_CREW_MODIFIER':
         const { name, value } = action.payload
         const newCrewMembers = state.crewMembers

         for (const member of Object.values(newCrewMembers)) {
            if (!member) continue
            member.setAppliedCrewModifier({
               name,
               paramName: name,
               value,
            })
         }
         return {
            ...state,
            crewMembers: { ...newCrewMembers },
         }
      case 'SET_APPLIED_CREW_SKILLS':
         const { crewSkillModifiers, role } = action.payload
         if (!role) {
         } else {
            const newSkillCrewMembers = state.crewMembers[role]
         }

         return state
      case 'REMOVE_APPLIED_CREW_MODIFIER':
         const newRemoveCrewMembers = state.crewMembers
         for (const member of Object.values(newRemoveCrewMembers)) {
            if (!member) continue
            member.removeAppliedCrewModifier(action.payload)
         }
         return {
            ...state,
            crewMembers: { ...newRemoveCrewMembers },
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

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
         const { crewSkillModifiers, role, appliedSkillName } = action.payload
         const crewMembers = state.crewMembers
         if (!role) {
            Object.values(crewMembers).forEach((member) => {
               if (!member) return
               member.setAppliedCrewSkill(appliedSkillName, crewSkillModifiers)
            })
         } else {
            const newSkillCrewMember = crewMembers[role]
            if (!newSkillCrewMember) return state
            newSkillCrewMember.setAppliedCrewSkill(appliedSkillName, crewSkillModifiers)
            crewMembers[role] = newSkillCrewMember
         }

         return {
            ...state,
            crewMembers: { ...crewMembers },
         }
      case 'REMOVE_APPLIED_CREW_SKILLS':
         const { skillName, crewRole } = action.payload
         const newRemoveSkillCrewMembers = state.crewMembers

         if (!crewRole) {
            Object.values(newRemoveSkillCrewMembers).forEach((member) => {
               if (!member) return
               member.removeAppliedCrewSkill(skillName)
            })
         } else {
            const newSkillCrewMember = newRemoveSkillCrewMembers[crewRole]
            if (!newSkillCrewMember) return state
            newSkillCrewMember.removeAppliedCrewSkill(skillName)
            newRemoveSkillCrewMembers[crewRole] = newSkillCrewMember
         }
         return {
            ...state,
            crewMembers: { ...newRemoveSkillCrewMembers },
         }
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

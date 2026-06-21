import type { ICrewReducerState, ICrewContextActions } from './Types'

export default function CrewReducer(
   state: ICrewReducerState,
   action: ICrewContextActions,
): ICrewReducerState {
   switch (action.type) {
      case 'TOGGLE_COMMANDER_BONUS':
         const newToggleCrewMembers = state.crewMembers
         const { checked, commanderEfficiency } = action.payload
         for (const member of Object.values(newToggleCrewMembers)) {
            if (!member) continue
            if (checked) {
               member.applyCommanderBonus(commanderEfficiency)
               member.setIsCommanderBonusApplied(true)
            } else {
               member.removeCommanderBonus()
               member.setIsCommanderBonusApplied()
            }
         }

         return {
            ...state,
            crewMembers: { ...newToggleCrewMembers },
         }
      case 'SET_APPLIED_CREW_MODIFIER':
         const { name, value } = action.payload
         const newCrewMembers = state.crewMembers

         state.commander.setAppliedCrewModifier({
            name,
            paramName: name,
            value,
         })
         for (const member of Object.values(newCrewMembers)) {
            if (!member) continue
            member.setAppliedCrewModifier({
               name,
               paramName: name,
               value,
            })
            member.applyCommanderBonus(state.commander.efficiencyLevel)
         }
         return {
            ...state,
            crewMembers: { ...newCrewMembers },
         }
      case 'REMOVE_APPLIED_CREW_MODIFIER':
         const newRemoveCrewMembers = state.crewMembers
         state.commander.removeAppliedCrewModifier(action.payload)

         for (const member of Object.values(newRemoveCrewMembers)) {
            if (!member) continue
            member.removeAppliedCrewModifier(action.payload)
            member.applyCommanderBonus(state.commander.efficiencyLevel)
         }
         return {
            ...state,
            crewMembers: { ...newRemoveCrewMembers },
         }
      case 'SET_APPLIED_CREW_SKILLS':
         const { crewSkillModifiers, role, appliedSkillName } = action.payload
         const crewMembers = state.crewMembers
         if (!role) {
            Object.values(crewMembers).forEach((member) => {
               if (!member) return
               member.setAppliedCrewSkill(appliedSkillName, crewSkillModifiers)
            })
            state.commander.setAppliedCrewSkill(appliedSkillName, crewSkillModifiers)
         } else {
            if (role === 'commander') {
               state.commander.setAppliedCrewSkill(appliedSkillName, crewSkillModifiers)
            } else {
               const newSkillCrewMember = crewMembers[role]
               if (!newSkillCrewMember) return state
               newSkillCrewMember.setAppliedCrewSkill(appliedSkillName, crewSkillModifiers)
               crewMembers[role] = newSkillCrewMember
            }
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
            state.commander.removeAppliedCrewSkill(skillName)
         } else {
            if (crewRole === 'commander') {
               state.commander.removeAppliedCrewSkill(skillName)
            } else {
               const newSkillCrewMember = newRemoveSkillCrewMembers[crewRole]
               if (!newSkillCrewMember) return state
               newSkillCrewMember.removeAppliedCrewSkill(skillName)
               newRemoveSkillCrewMembers[crewRole] = newSkillCrewMember
            }
         }
         return {
            ...state,
            crewMembers: { ...newRemoveSkillCrewMembers },
         }

      case 'ADD_INITIAL_CREW':
         return {
            ...state,
            crewMembers: action.payload,
         }
      case 'SET_COMMANDER':
         return {
            ...state,
            commander: action.payload,
         }
      default:
         return state
   }
}

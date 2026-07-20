import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'
import useAppliedSkills from './useAppliedSkills'

import CrewSkills, { type IRolesNonCommander, CrewSkillRoles } from '@/Classes/CrewSkills'

import SetCommonSkills from './Helpers/CommonSkills'

export default function useHandleClick(
   selectedSkills: string[],
   role: CrewSkillRoles,
   setCommonSkillsSelected: Dispatch<SetStateAction<number>>,
) {
   const {
      crewDispatch,
      crewReducer: { crewMembers, commander },
      // isCalculateSituational,
   } = useContext(CrewContext)

   const [isSecondarySkill, setIsSecondarySkill] = useState<boolean>(false)
   const { removeAppliedCrewSkill, setAppliedCrewSkill, setSkillsSelected, skillsSelected } =
      useAppliedSkills()

   function handleClick(event: React.MouseEvent<HTMLElement>, value: string, skill: CrewSkills) {
      // if (skill.modifiers.find((modifier) => modifier.paramName === 'crewLevelIncrease')) {
      //    console.log('SKILL FROM HANDLE CLICK: ', skill)
      //    if (selectedSkills.includes('brotherhood') || selectedSkills.includes(skill.xmlName)) {
      //       setSkillsSelected((prev) => prev - 1)
      //       setCommonSkillsSelected((prev) => prev - 1)
      //       crewDispatch({
      //          type: 'REMOVE_APPLIED_CREW_MODIFIER',
      //          payload: skill.xmlName,
      //       })
      //    } else {
      //       setSkillsSelected((prev) => prev + 1)
      //       setCommonSkillsSelected((prev) => prev + 1)
      //       crewDispatch({
      //          type: 'SET_APPLIED_CREW_MODIFIER',
      //          payload: {
      //             name: skill.xmlName,
      //             value: skill.modifiers[0].value,
      //             situationalParam: skill.modifiers[0].situationalParam ?? false,
      //             isActiveSituational: isCalculateSituational,
      //          },
      //       })
      //    }
      //    return
      // }
      // console.log('ROLE SKILL', skill, role)
      switch (role) {
         case 'common':
            SetCommonSkills(skill, selectedSkills, setSkillsSelected, setCommonSkillsSelected, crewDispatch)
            break
         case 'commander':
            if (selectedSkills.includes(skill.xmlName)) {
               removeAppliedCrewSkill(skill.xmlName, 'commander')
            } else {
               setAppliedCrewSkill(skill.xmlName, skill.modifiers, 'commander')
            }
            break
         default:
            /**
             * In this case commander has secondaryRole
             */
            if (commander.secondaryRole.includes(role)) {
               setIsSecondarySkill(true)
               if (selectedSkills.includes(skill.xmlName)) {
                  removeAppliedCrewSkill(skill.xmlName, 'commander')
                  return
               } else {
                  setAppliedCrewSkill(skill.xmlName, skill.modifiers, 'commander')
                  return
               }
            }

            /**
             * Find the first member that has a SECONDARY role matches with the role
             */
            const secondarySkill = Object.values(crewMembers).find((member) => {
               if (member && member.secondaryRole[0] === role) return true
            })

            /**
             * in this case the role is a SECONDARY one e.g: T100LT Commader -> radioman
             */
            if (secondarySkill !== undefined) {
               setIsSecondarySkill(true)
               if (selectedSkills.includes(skill.xmlName)) {
                  removeAppliedCrewSkill(skill.xmlName, secondarySkill.primaryRole)
                  return
               } else {
                  setAppliedCrewSkill(skill.xmlName, skill.modifiers, secondarySkill.primaryRole)
                  return
               }
               /**
                * in this case the role is a PRIMARY one e.g: T100LT Commader, LOADER etc
                */
            } else {
               if (selectedSkills.includes(skill.xmlName)) {
                  removeAppliedCrewSkill(skill.xmlName, role as IRolesNonCommander)
               } else {
                  setAppliedCrewSkill(skill.xmlName, skill.modifiers, role)
               }
            }
            break
      }
   }

   return { handleClick, skillsSelected, isSecondarySkill }
}

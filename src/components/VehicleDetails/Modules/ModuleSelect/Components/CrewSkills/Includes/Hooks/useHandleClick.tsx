import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import CrewSkills, { type ICrewRoles, CrewSkillRoles } from '@/Classes/CrewSkills'

import SetCommonSkills from './Helpers/CommonSkills'

export default function useHandleClick(
   selectedSkills: string[],
   role: CrewSkillRoles,
   setCommonSkillsSelected: Dispatch<SetStateAction<number>>,
) {
   const {
      crewDispatch,
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const [skillsSelected, setSkillsSelected] = useState<number>(0)
   const [isSecondarySkill, setIsSecondarySkill] = useState<boolean>(false)

   function handleClick(event: React.MouseEvent<HTMLElement>, value: string, skill: CrewSkills) {
      if (role === 'common') {
         SetCommonSkills(skill, selectedSkills, setSkillsSelected, setCommonSkillsSelected, crewDispatch)
      } else {
         /**
          * Find the first member that has a SECONDARY role matches with the role
          */
         const isSecondarySkill = Object.values(crewMembers).find((member) => {
            if (member && member.secondaryRole[0] === role) return true
         })

         /**
          * in this case the role is a SECONDARY one e.g: T100LT Commader -> radioman
          */
         if (isSecondarySkill !== undefined) {
            setIsSecondarySkill(true)
            if (selectedSkills.includes(skill.xmlName)) {
               setSkillsSelected((prev) => prev - 1)
               crewDispatch({
                  type: 'REMOVE_APPLIED_CREW_SKILLS',
                  payload: {
                     skillName: skill.xmlName,
                     crewRole: isSecondarySkill.primaryRole,
                  },
               })
               return
            } else {
               setSkillsSelected((prev) => prev + 1)
               crewDispatch({
                  type: 'SET_APPLIED_CREW_SKILLS',
                  payload: {
                     appliedSkillName: skill.xmlName,
                     crewSkillModifiers: skill.modifiers,
                     role: isSecondarySkill.primaryRole,
                  },
               })
               return
            }
            /**
             * in this case the role is a PRIMARY one e.g: T100LT Commader, LOADER etc
             */
         } else {
            if (selectedSkills.includes(skill.xmlName)) {
               setSkillsSelected((prev) => prev - 1)
               crewDispatch({
                  type: 'REMOVE_APPLIED_CREW_SKILLS',
                  payload: {
                     skillName: skill.xmlName,
                     crewRole: role as ICrewRoles,
                  },
               })
            } else {
               setSkillsSelected((prev) => prev + 1)
               crewDispatch({
                  type: 'SET_APPLIED_CREW_SKILLS',
                  payload: {
                     appliedSkillName: skill.xmlName,
                     crewSkillModifiers: skill.modifiers,
                     role,
                  },
               })
            }
         }
      }
   }

   return { handleClick, skillsSelected, isSecondarySkill }
}

import { useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import CrewSkills, { type ICrewRoles } from '@/Classes/CrewSkills'

export default function useHandleClick(selectedSkills: string[], role: ICrewRoles) {
   const {
      crewDispatch,
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const [primarySkillsSelected, setPrimarySkillsSelected] = useState<number>(0)
   const [secondarySkillsSelected, setSecondarySkillsSelected] = useState<number>(0)

   function handleClick(skill: CrewSkills) {
      /**
       * in this case the role is a secondary one e.g: T100LT Commader -> radioman
       */
      Object.entries(crewMembers).map(([crewRole, member]) => {
         if (member?.secondaryRole[0] === role) {
            console.log('SECONDARY SKILL SELECTION::::')
            if (selectedSkills.includes(skill.xmlName)) {
               setSecondarySkillsSelected((prev) => prev - 1)
               crewDispatch({
                  type: 'REMOVE_APPLIED_CREW_SKILLS',
                  payload: {
                     skillName: skill.xmlName,
                     crewRole: crewRole as ICrewRoles,
                  },
               })
               return
            } else {
               setSecondarySkillsSelected((prev) => prev + 1)
               crewDispatch({
                  type: 'SET_APPLIED_CREW_SKILLS',
                  payload: {
                     appliedSkillName: skill.xmlName,
                     crewSkillModifiers: skill.modifiers,
                     role: crewRole as ICrewRoles,
                  },
               })
               return
            }
         }
      })

      if (selectedSkills.includes(skill.xmlName)) {
         setPrimarySkillsSelected((prev) => prev - 1)
         crewDispatch({
            type: 'REMOVE_APPLIED_CREW_SKILLS',
            payload: {
               skillName: skill.xmlName,
               crewRole: role,
            },
         })
      } else {
         setPrimarySkillsSelected((prev) => prev + 1)
         console.log('PRIMARY SKILL SELECTION::::')
         if (skill.xmlName === 'brotherhood' || skill.modifiers[0].paramName === 'crewLevelIncrease') {
            crewDispatch({
               type: 'SET_APPLIED_CREW_MODIFIER',
               payload: {
                  name: skill.xmlName,
                  value: skill.modifiers[0].value,
               },
            })
         } else {
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

   return { handleClick, primarySkillsSelected, secondarySkillsSelected }
}

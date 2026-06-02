import { useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import CrewSkills, { type ICrewRoles, CrewSkillRoles } from '@/Classes/CrewSkills'

export default function useHandleClick(selectedSkills: string[], role: CrewSkillRoles) {
   const {
      crewDispatch,
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const [primarySkillsSelected, setPrimarySkillsSelected] = useState<number>(0)
   const [secondarySkillsSelected, setSecondarySkillsSelected] = useState<number>(0)

   function handleClick(event: React.MouseEvent<HTMLElement>, value: string, skill: CrewSkills) {
      if (role === 'common') {
         switch (skill.xmlName) {
            case 'brotherhood':
               console.log('BROTHERHOOD CREW MODIFIER', role)
               setPrimarySkillsSelected((prev) => prev + 1)
               crewDispatch({
                  type: 'SET_APPLIED_CREW_MODIFIER',
                  payload: {
                     name: skill.xmlName,
                     value: skill.modifiers[0].value,
                  },
               })
               break
            case 'repair':
            case 'camouflage':
               console.log('REPAIR OR CAMO CREW MODIFIER', role)
               setPrimarySkillsSelected((prev) => prev + 1)
               crewDispatch({
                  type: 'SET_APPLIED_CREW_SKILLS',
                  payload: {
                     appliedSkillName: skill.xmlName,
                     crewSkillModifiers: skill.modifiers,
                     role: undefined,
                  },
               })
               break
         }
      }
      /**
       * in this case the role is a secondary one e.g: T100LT Commader -> radioman
       */
      Object.entries(crewMembers).map(([crewRole, member]) => {
         if (member?.secondaryRole[0] === role) {
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
               crewRole: role as ICrewRoles,
            },
         })
      } else {
         setPrimarySkillsSelected((prev) => prev + 1)
         if (skill.xmlName === 'brotherhood' && skill.modifiers[0].paramName === 'crewLevelIncrease') {
            // console.log('REMOVE CREW MODIFIER', role)
            // // if (['brotherhood', 'camouflage', 'repair'].includes(skill.xmlName)) {
            // crewDispatch({
            //    type: 'SET_APPLIED_CREW_MODIFIER',
            //    payload: {
            //       name: skill.xmlName,
            //       value: skill.modifiers[0].value,
            //    },
            // })
         } else {
            crewDispatch({
               type: 'SET_APPLIED_CREW_SKILLS',
               payload: {
                  appliedSkillName: skill.xmlName,
                  crewSkillModifiers: skill.modifiers,
                  role: role as ICrewRoles,
               },
            })
         }
      }
   }

   return { handleClick, primarySkillsSelected, secondarySkillsSelected }
}

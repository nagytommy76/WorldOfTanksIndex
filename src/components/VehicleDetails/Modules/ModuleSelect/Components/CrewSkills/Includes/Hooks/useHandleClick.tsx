import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import CrewSkills, { type ICrewRoles, CrewSkillModifier, CrewSkillRoles } from '@/Classes/CrewSkills'
import { ICrewContextActions } from '@/VehicleContext/CrewContext/Types'

export default function useHandleClick(selectedSkills: string[], role: CrewSkillRoles) {
   const {
      crewDispatch,
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const [primarySkillsSelected, setPrimarySkillsSelected] = useState<number>(0)
   const [secondarySkillsSelected, setSecondarySkillsSelected] = useState<number>(0)

   function setAppliedCrewSkills({
      modifiers,
      role = undefined,
      setPrimaryOrSecondarySkillsSelected,
      xmlName,
   }: {
      xmlName: string
      modifiers: CrewSkillModifier[]
      role?: ICrewRoles | undefined
      setPrimaryOrSecondarySkillsSelected: Dispatch<SetStateAction<number>>
   }) {
      setPrimaryOrSecondarySkillsSelected((prev) => prev + 1)
      crewDispatch({
         type: 'SET_APPLIED_CREW_SKILLS',
         payload: {
            appliedSkillName: xmlName,
            crewSkillModifiers: modifiers,
            role,
         },
      })
   }

   function handleClick(event: React.MouseEvent<HTMLElement>, value: string, skill: CrewSkills) {
      if (role === 'common') {
         switch (skill.xmlName) {
            case 'brotherhood':
               // console.log('BROTHERHOOD CREW MODIFIER', role)
               if (selectedSkills.includes('brotherhood')) {
                  setPrimarySkillsSelected((prev) => prev - 1)
                  crewDispatch({
                     type: 'REMOVE_APPLIED_CREW_MODIFIER',
                     payload: skill.xmlName,
                  })
               } else {
                  setPrimarySkillsSelected((prev) => prev + 1)
                  crewDispatch({
                     type: 'SET_APPLIED_CREW_MODIFIER',
                     payload: {
                        name: skill.xmlName,
                        value: skill.modifiers[0].value,
                     },
                  })
               }
               break
            case 'repair':
               if (!selectedSkills.includes('repair')) {
                  console.log('SET!!!!!! REPAIR OR CAMO CREW MODIFIER', selectedSkills)
                  setAppliedCrewSkills({
                     setPrimaryOrSecondarySkillsSelected: setPrimarySkillsSelected,
                     xmlName: skill.xmlName,
                     modifiers: skill.modifiers,
                  })
               } else {
                  console.log('REMOVE REPAIR OR CAMO CREW MODIFIER', selectedSkills)
                  setPrimarySkillsSelected((prev) => prev - 1)
                  crewDispatch({
                     type: 'REMOVE_APPLIED_CREW_SKILLS',
                     payload: {
                        skillName: skill.xmlName,
                        crewRole: undefined,
                     },
                  })
               }
               break
            case 'camouflage':
               if (!selectedSkills.includes('camouflage')) {
                  console.log('SET!!!!!! REPAIR OR CAMO CREW MODIFIER', selectedSkills)
                  setAppliedCrewSkills({
                     setPrimaryOrSecondarySkillsSelected: setPrimarySkillsSelected,
                     xmlName: skill.xmlName,
                     modifiers: skill.modifiers,
                  })
               } else {
                  console.log('REMOVE REPAIR OR CAMO CREW MODIFIER', selectedSkills)
                  setPrimarySkillsSelected((prev) => prev - 1)
                  crewDispatch({
                     type: 'REMOVE_APPLIED_CREW_SKILLS',
                     payload: {
                        skillName: skill.xmlName,
                        crewRole: undefined,
                     },
                  })
               }
               break
         }
      } else {
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
               setAppliedCrewSkills({
                  setPrimaryOrSecondarySkillsSelected: setSecondarySkillsSelected,
                  xmlName: skill.xmlName,
                  modifiers: skill.modifiers,
                  role: crewRole as ICrewRoles,
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
            // crewDispatch({
            //    type: 'SET_APPLIED_CREW_SKILLS',
            //    payload: {
            //       appliedSkillName: skill.xmlName,
            //       crewSkillModifiers: skill.modifiers,
            //       role: role as ICrewRoles,
            //    },
            // })
            setAppliedCrewSkills({
               setPrimaryOrSecondarySkillsSelected: setPrimarySkillsSelected,
               xmlName: skill.xmlName,
               modifiers: skill.modifiers,
               role: role as ICrewRoles,
            })
         }
      }
   }

   return { handleClick, primarySkillsSelected, secondarySkillsSelected }
}

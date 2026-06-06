import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import CrewSkills, { type ICrewRoles, CrewSkillModifier, CrewSkillRoles } from '@/Classes/CrewSkills'

export default function useHandleClick(selectedSkills: string[], role: CrewSkillRoles) {
   const {
      crewDispatch,
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const [skillsSelected, setSkillsSelected] = useState<number>(0)
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
               if (selectedSkills.includes('brotherhood')) {
                  setSkillsSelected((prev) => prev - 1)
                  crewDispatch({
                     type: 'REMOVE_APPLIED_CREW_MODIFIER',
                     payload: skill.xmlName,
                  })
               } else {
                  setSkillsSelected((prev) => prev + 1)
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
                  setAppliedCrewSkills({
                     setPrimaryOrSecondarySkillsSelected: setSkillsSelected,
                     xmlName: skill.xmlName,
                     modifiers: skill.modifiers,
                  })
               } else {
                  console.log('REMOVE REPAIR OR CAMO CREW MODIFIER', selectedSkills)
                  setSkillsSelected((prev) => prev - 1)
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
                  setAppliedCrewSkills({
                     setPrimaryOrSecondarySkillsSelected: setSkillsSelected,
                     xmlName: skill.xmlName,
                     modifiers: skill.modifiers,
                  })
               } else {
                  console.log('REMOVE REPAIR OR CAMO CREW MODIFIER', selectedSkills)
                  setSkillsSelected((prev) => prev - 1)
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
         // const [role, skillName] = value.split('_')
         const isSecondarySkill = Object.entries(crewMembers).map(([crewRole, member]) => {
            if (member?.secondaryRole[0] === role) return true
            else return false
         })

         console.log(isSecondarySkill)

         /**
          * in this case the role is a secondary one e.g: T100LT Commader -> radioman
          */
         Object.entries(crewMembers).map(([crewRole, member]) => {
            if (member?.secondaryRole[0] === role) {
               console.log('SECONDARY SKILL SELECT', member)
               if (selectedSkills.includes(skill.xmlName)) {
                  setSkillsSelected((prev) => prev - 1)
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
                     setPrimaryOrSecondarySkillsSelected: setSkillsSelected,
                     xmlName: skill.xmlName,
                     modifiers: skill.modifiers,
                     role: crewRole as ICrewRoles,
                  })
                  return
               }
            }
         })

         if (selectedSkills.includes(skill.xmlName)) {
            console.log('REMOVE PRINMARY SKILLLL:: ', selectedSkills)
            setSkillsSelected((prev) => prev - 1)
            crewDispatch({
               type: 'REMOVE_APPLIED_CREW_SKILLS',
               payload: {
                  skillName: skill.xmlName,
                  crewRole: role as ICrewRoles,
               },
            })
         } else {
            console.log('ADD PRIMARY SKILL SKILL SELECT', selectedSkills)
            setSkillsSelected((prev) => prev + 1)

            setAppliedCrewSkills({
               setPrimaryOrSecondarySkillsSelected: setSkillsSelected,
               xmlName: skill.xmlName,
               modifiers: skill.modifiers,
               role: role as ICrewRoles,
            })
         }
      }
   }

   return { handleClick, primarySkillsSelected, secondarySkillsSelected, skillsSelected }
}

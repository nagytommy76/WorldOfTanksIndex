import { useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import SingleCrewSkill from './SingleCrewSkill'

import CrewSkills, { ICrewRoles } from '@/Classes/CrewSkills'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleCrewSkills({ skills, role }: { skills: CrewSkills[]; role: ICrewRoles }) {
   const {
      crewDispatch,
      //   crewReducer: { crewMembers },
   } = useContext(CrewContext)
   const [selectedSkills, setSelectedSkills] = useState<string[]>(() => [])

   const handleChange = (event: React.MouseEvent<HTMLElement>, newFormats: string) => {
      if (selectedSkills.includes(newFormats)) {
         const filteredCrewSkill = selectedSkills.filter((skill) => skill !== newFormats)
         setSelectedSkills(filteredCrewSkill)
      } else {
         setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, newFormats])
      }
   }

   function handleClick(skill: CrewSkills) {
      if (selectedSkills.includes(skill.xmlName)) {
         console.log('INCLUDES SO REMOVE SKILL FROM CREW!!!!!!!!!!!!!!!!!!!: ')
      } else {
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

   return (
      <ToggleButtonGroup
         aria-label={`
         ${role} crew skill list
      `}
         className='gap-1'
         orientation='vertical'
         value={selectedSkills}
         exclusive
         onChange={handleChange}
      >
         {skills.map((skill) => (
            <ToggleButton
               key={skill.xmlName}
               value={skill.xmlName}
               aria-label='crew_skill_list'
               onClick={() => handleClick(skill)}
               sx={{
                  padding: '2px',
                  border: 'none',
               }}
            >
               <SingleCrewSkill skill={skill} />
            </ToggleButton>
         ))}
      </ToggleButtonGroup>
   )
}

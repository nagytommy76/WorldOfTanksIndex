import type { Dispatch, SetStateAction } from 'react'

import useHandleToggleChange from './Hooks/useHandleToggleChange'
import useHandleClick from './Hooks/useHandleClick'

import SingleCrewSkill from './SingleCrewSkill'
import CrewSkills, { CrewSkillRoles } from '@/Classes/CrewSkills'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleCrewSkills({
   skills,
   role,
   commonSkillsSelected,
   setCommonSkillsSelected,
}: {
   skills: CrewSkills[]
   role: CrewSkillRoles
   commonSkillsSelected: number
   setCommonSkillsSelected: Dispatch<SetStateAction<number>>
}) {
   const { handleToggleChancge, selectedSkills } = useHandleToggleChange()
   const { handleClick, skillsSelected, isSecondarySkill } = useHandleClick(
      selectedSkills,
      role,
      setCommonSkillsSelected,
   )

   return (
      <ToggleButtonGroup
         aria-label={`
         ${role} crew skill list
      `}
         className='gap-1'
         orientation='vertical'
         value={selectedSkills}
         onChange={handleToggleChancge}
      >
         {skills.map((skill) => (
            <ToggleButton
               key={skill.xmlName}
               value={skill.xmlName}
               aria-label='crew_skill_list'
               onClick={(event, value) => handleClick(event, value, skill)}
               className='border-none'
               sx={{
                  padding: '2px',
                  border: 'none',
               }}
               disabled={
                  (isSecondarySkill ? skillsSelected >= 3 : commonSkillsSelected + skillsSelected >= 6) &&
                  !selectedSkills.includes(skill.xmlName)
               }
            >
               <SingleCrewSkill
                  isDisabled={
                     (isSecondarySkill ? skillsSelected >= 3 : commonSkillsSelected + skillsSelected >= 6) &&
                     !selectedSkills.includes(skill.xmlName)
                  }
                  skill={skill}
               />
            </ToggleButton>
         ))}
      </ToggleButtonGroup>
   )
}

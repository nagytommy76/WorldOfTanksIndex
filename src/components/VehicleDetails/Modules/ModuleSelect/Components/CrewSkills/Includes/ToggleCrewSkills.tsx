import useHandleToggleChange from './Hooks/useHandleToggleChange'
import useHandleClick from './Hooks/useHandleClick'

import SingleCrewSkill from './SingleCrewSkill'
import CrewSkills, { ICrewRoles } from '@/Classes/CrewSkills'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleCrewSkills({ skills, role }: { skills: CrewSkills[]; role: ICrewRoles }) {
   const { handleToggleChancge, selectedSkills } = useHandleToggleChange()
   const { handleClick, primarySkillsSelected, secondarySkillsSelected } = useHandleClick(
      selectedSkills,
      role,
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
                  (primarySkillsSelected >= 6 || secondarySkillsSelected >= 3) &&
                  !selectedSkills.includes(skill.xmlName)
               }
            >
               <SingleCrewSkill
                  isDisabled={
                     (primarySkillsSelected >= 6 || secondarySkillsSelected >= 3) &&
                     !selectedSkills.includes(skill.xmlName)
                  }
                  skill={skill}
               />
            </ToggleButton>
         ))}
      </ToggleButtonGroup>
   )
}

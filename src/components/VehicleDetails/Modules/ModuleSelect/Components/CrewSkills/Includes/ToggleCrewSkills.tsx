import { useEffect } from 'react'

import useHandleToggleChange from './Hooks/useHandleToggleChange'
import useHandleClick from './Hooks/useHandleClick'
import { isRoleLimitReached } from './Hooks/Helpers/SkillLimits'

import SingleCrewSkill from './SingleCrewSkill'
import CrewSkills, { CrewSkillRoles } from '@/Classes/CrewSkills'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleCrewSkills({
   skills,
   role,
   isSecondary,
   commonSelected,
   maxPrimaryOwnSelected,
   reportSelectedCount,
}: {
   skills: CrewSkills[]
   role: CrewSkillRoles
   isSecondary: boolean
   commonSelected: number
   maxPrimaryOwnSelected: number
   reportSelectedCount: (role: CrewSkillRoles, count: number) => void
}) {
   const { handleToggleChancge, selectedSkills } = useHandleToggleChange(role)
   const { handleClick } = useHandleClick(selectedSkills, role)

   /**
    * Only count the skills of this column, selectedSkills may contain other column's skills
    * e.g: commander & common are both filled from commander.appliedCrewSkills
    */
   const ownSelected = skills.filter((skill) => selectedSkills.includes(skill.xmlName)).length

   useEffect(() => {
      reportSelectedCount(role, ownSelected)
   }, [role, ownSelected, reportSelectedCount])

   const limitReached = isRoleLimitReached(
      role,
      ownSelected,
      isSecondary,
      commonSelected,
      maxPrimaryOwnSelected,
   )
   const isDisabled = (xmlName: string) => limitReached && !selectedSkills.includes(xmlName)

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
               disabled={isDisabled(skill.xmlName)}
            >
               <SingleCrewSkill isDisabled={isDisabled(skill.xmlName)} skill={skill} />
            </ToggleButton>
         ))}
      </ToggleButtonGroup>
   )
}

import Image from 'next/image'
import { useState } from 'react'

import type { CrewSkillRoles, ICrewRoles } from '@/Classes/CrewSkills'
import useGetCrewSkills from './Hooks/useGetCrewSkills'
import SingleCrewSkill from './Includes/SingleCrewSkill'

import Typography from '@mui/material/Typography'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function CrewSkills() {
   const crewSkills = useGetCrewSkills()
   const [selectedSkills, setSelectedSkills] = useState<string[]>([])

   /**
    * T100Lt has 3 crew members:
    * - Commander (Secondary: radioman)
    * - Driver
    * - Gunner (Secondary: loader)
    *
    * Maximum selection in this case:
    *  -Commander - 6
    *  -Radioman (secondary) - 3
    *  -Driver - 6
    *  -Gunner - 6
    *  -Loader (secondary) - 3
    */

   if (!crewSkills) return <h1>LOADING....</h1>

   const crewOrder: CrewSkillRoles[] = ['common', 'commander', 'loader', 'driver', 'radioman', 'gunner']
   const sortedCrew = Object.fromEntries(
      crewOrder.filter((role) => role in crewSkills).map((role) => [role, crewSkills[role]]),
   ) as Record<CrewSkillRoles, (typeof crewSkills)[CrewSkillRoles]>

   const handleChange = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
      setSelectedSkills(newFormats)
   }

   console.log(sortedCrew)

   return (
      <>
         <Typography variant='h6'>Crew Skills</Typography>
         <ToggleButtonGroup
            className='gap-1'
            orientation='horizontal'
            value={selectedSkills}
            exclusive
            onChange={handleChange}
         >
            {Object.entries(sortedCrew).map(([role, skills]) => (
               <div className='flex flex-col items-center' key={role}>
                  <Image
                     src={`/crewSkills/roles/${role}.png`}
                     alt={role}
                     width={20}
                     height={20}
                     title={`${role} skills`}
                     className='w-[20px] h-[20px] object-cover mb-3'
                  />
                  {skills.map((skill) => (
                     <ToggleButton
                        key={skill.xmlName}
                        value={skill.xmlName}
                        aria-label='crew_skill_list'
                        sx={{
                           padding: '2px',
                           border: 'none',
                        }}
                     >
                        <SingleCrewSkill key={skill.xmlName} role={role as ICrewRoles} skill={skill} />
                     </ToggleButton>
                  ))}
               </div>
            ))}
         </ToggleButtonGroup>
      </>
   )
}

import React from 'react'
import Image from 'next/image'

import type { CrewSkillRoles } from '@/Classes/CrewSkills'

import useGetCrewSkills from './Hooks/useGetCrewSkills'

import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

export default function CrewSkills() {
   const crewSkills = useGetCrewSkills()
   if (!crewSkills) return <h1>LOADING....</h1>

   const crewOrder: CrewSkillRoles[] = ['common', 'commander', 'loader', 'driver', 'radioman', 'gunner']

   const sortedCrew = Object.fromEntries(
      crewOrder.filter((role) => role in crewSkills).map((role) => [role, crewSkills[role]]),
   ) as Record<CrewSkillRoles, (typeof crewSkills)[CrewSkillRoles]>

   console.log(sortedCrew)

   return (
      <>
         <Typography variant='h6'>Crew Skills</Typography>
         <section className='flex flex-row'>
            {Object.entries(sortedCrew).map(([role, skills]) => (
               <div className='flex flex-col' key={role}>
                  {skills.map((skill) => (
                     <Tooltip disableInteractive key={skill.xmlName} title={skill.description}>
                        <Image
                           src={`/crewSkills/${skill.xmlName}.png`}
                           alt={skill.xmlName}
                           width={60}
                           height={60}
                           className=''
                        />
                     </Tooltip>
                  ))}
               </div>
            ))}
         </section>
      </>
   )
}

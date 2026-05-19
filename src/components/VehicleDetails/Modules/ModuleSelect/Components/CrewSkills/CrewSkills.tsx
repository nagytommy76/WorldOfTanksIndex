import React from 'react'
import Image from 'next/image'

import type { CrewSkillRoles } from '@/Classes/CrewSkills'
import useGetCrewSkills from './Hooks/useGetCrewSkills'

import HtmlTooltip from '@/helpers/HtmlTooltip'
import TooltipContent from './Includes/TooltipContent'

import Typography from '@mui/material/Typography'

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
               <div className='flex flex-col gap-2' key={role}>
                  {skills.map((skill) => (
                     <HtmlTooltip
                        key={skill.xmlName}
                        placement='top'
                        title={
                           <TooltipContent
                              skillName={skill.name || 'Unknown'}
                              description={skill.description}
                              iconName={skill.xmlName}
                              isSituational={skill.typeName === 'situational'}
                           />
                        }
                        disableInteractive
                     >
                        <Image
                           src={`/crewSkills/${skill.xmlName}.png`}
                           alt={skill.xmlName}
                           width={40}
                           height={40}
                           className=''
                        />
                     </HtmlTooltip>
                  ))}
               </div>
            ))}
         </section>
      </>
   )
}

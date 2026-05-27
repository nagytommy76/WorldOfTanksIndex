import Image from 'next/image'

import type { CrewSkillRoles, ICrewRoles } from '@/Classes/CrewSkills'
import useGetCrewSkills from './Hooks/useGetCrewSkills'
import ToggleCrewSkills from './Includes/ToggleCrewSkills'

import Typography from '@mui/material/Typography'

export default function CrewSkills() {
   const crewSkills = useGetCrewSkills()

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

   return (
      <>
         <Typography variant='h6'>Crew Skills</Typography>
         <div className='flex flex-row'>
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
                  <ToggleCrewSkills skills={skills} role={role as ICrewRoles} />
               </div>
            ))}
         </div>
      </>
   )
}

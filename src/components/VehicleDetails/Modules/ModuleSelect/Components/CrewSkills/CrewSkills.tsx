import Image from 'next/image'
import { useState } from 'react'

import type { CrewSkillRoles } from '@/Classes/CrewSkills'
import useGetCrewSkills from './Hooks/useGetCrewSkills'
import ToggleCrewSkills from './Includes/ToggleCrewSkills'
import ReturnTypography from '../../Includes/ModuleType'

import ActiveSituational from './Includes/ActiveSituational'
import CrewBattleBoosters from './CrewBattleBooster/CrewBattleBoosters'

export default function CrewSkills() {
   const crewSkills = useGetCrewSkills()
   const [commonSkillsSelected, setCommonSkillsSelected] = useState<number>(0)

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

   return (
      <section className='flex flex-col items-center gap-3 w-[330px] xl:w-[265px] p-2'>
         <ReturnTypography text='Crew Skills' variant='h4' />
         <div className='flex flex-row'>
            {Object.entries(crewSkills).map(([role, skills]) => (
               <div className='flex flex-col items-center' key={role}>
                  <Image
                     src={`/crewSkills/roles/${role}.png`}
                     alt={role}
                     width={20}
                     height={20}
                     title={`${role} skills`}
                     className='w-[20px] h-[20px] object-cover mb-3'
                  />
                  <ToggleCrewSkills
                     skills={skills}
                     role={role as CrewSkillRoles}
                     commonSkillsSelected={commonSkillsSelected}
                     setCommonSkillsSelected={setCommonSkillsSelected}
                  />
               </div>
            ))}
         </div>
         <ActiveSituational />
         <CrewBattleBoosters />
      </section>
   )
}

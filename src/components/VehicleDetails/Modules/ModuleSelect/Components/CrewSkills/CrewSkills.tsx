import Image from 'next/image'
import { useCallback, useState } from 'react'
import CrewSkillContextProvider from './CrewBattleBooster/Context/CrewSkillContext'

import type { CrewSkillRoles } from '@/Classes/CrewSkills'
import useGetCrewSkills from './Hooks/useGetCrewSkills'
import useIsSecondaryRole from './Includes/Hooks/useIsSecondaryRole'
import ToggleCrewSkills from './Includes/ToggleCrewSkills'
import ReturnTypography from '../../Includes/ModuleType'

import ActiveSituational from './Includes/ActiveSituational'
import CrewBattleBoosters from './CrewBattleBooster/CrewBattleBoosters'

export default function CrewSkills() {
   const crewSkills = useGetCrewSkills()
   const isSecondaryRole = useIsSecondaryRole()
   const [selectedCounts, setSelectedCounts] = useState<Partial<Record<CrewSkillRoles, number>>>({})

   const reportSelectedCount = useCallback((role: CrewSkillRoles, count: number) => {
      setSelectedCounts((prev) => (prev[role] === count ? prev : { ...prev, [role]: count }))
   }, [])

   /**
    * T100Lt has 3 crew members:
    * - Commander (Secondary: radioman)
    * - Driver
    * - Gunner (Secondary: loader)
    *
    * Maximum selection in this case:
    *  -Commander - 6 (including common skills)
    *  -Radioman (secondary) - 3 (excluding common skills)
    *  -Driver - 6 (including common skills)
    *  -Gunner - 6 (including common skills)
    *  -Loader (secondary) - 3 (excluding common skills)
    *
    * Common skills are blocked when any primary role reaches 6.
    */
   const commonSelected = selectedCounts.common ?? 0
   const maxPrimaryOwnSelected = Math.max(
      0,
      ...Object.entries(selectedCounts)
         .filter(([role]) => role !== 'common' && !isSecondaryRole(role as CrewSkillRoles))
         .map(([, count]) => count ?? 0),
   )

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
                     isSecondary={isSecondaryRole(role as CrewSkillRoles)}
                     commonSelected={commonSelected}
                     maxPrimaryOwnSelected={maxPrimaryOwnSelected}
                     reportSelectedCount={reportSelectedCount}
                  />
               </div>
            ))}
         </div>
         <ActiveSituational />
         <CrewSkillContextProvider crewSkills={crewSkills}>
            <CrewBattleBoosters />
         </CrewSkillContextProvider>
      </section>
   )
}

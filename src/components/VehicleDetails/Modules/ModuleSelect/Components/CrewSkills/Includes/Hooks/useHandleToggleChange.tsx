import { useContext, useCallback, useEffect, useState } from 'react'
import { CrewContext } from '@/CrewContext/CrewContext'

import type { CrewSkillRoles } from '@/src/Classes/CrewSkills'
import type { IappliedCrewSkills } from '@/CrewContext/Classes/Crew'

export default function useHandleToggleChange(role: CrewSkillRoles) {
   const {
      crewReducer: { commander, crewMembers },
   } = useContext(CrewContext)

   const [selectedSkills, setSelectedSkills] = useState<string[]>(() => [])

   const setSelectedSkill = useCallback(
      (appliedCrewSkill: IappliedCrewSkills) => {
         appliedCrewSkill.keys().forEach((skillName) => {
            if (!selectedSkills.includes(skillName)) {
               setSelectedSkills((prevSkills) => [...prevSkills, skillName])
            }
         })
      },
      [selectedSkills],
   )

   /**
    * BROTHERHOOD SKILL GOES TO appliedCrewModifiers!!!!!!!!!! FIX IT
    */
   useEffect(() => {
      switch (role) {
         case 'commander':
         case 'common':
            if (commander.appliedCrewSkills) {
               setSelectedSkill(commander.appliedCrewSkills)
            }
            if (commander.appliedCrewModifiers && commander.appliedCrewModifiers.has('brotherhood')) {
               if (!selectedSkills.includes('brotherhood')) {
                  setSelectedSkills((prevSkills) => [...prevSkills, 'brotherhood'])
               }
            }
            break
         default:
            const member = crewMembers[role]
            /**
             * in this case commander has the secondary ROLE:
             */
            if (member === undefined) {
               if (commander.appliedCrewSkills && commander.secondaryRole.includes(role)) {
                  setSelectedSkill(commander.appliedCrewSkills)
               }
               Object.values(crewMembers).map((singleMember) => {
                  /**
                   * in this case a crew member has the secondary ROLE
                   */
                  if (
                     singleMember &&
                     singleMember.secondaryRole.includes(role) &&
                     singleMember.appliedCrewSkills
                  ) {
                     setSelectedSkill(singleMember.appliedCrewSkills)
                  }
               })
               break
            }

            if (member?.appliedCrewSkills) {
               setSelectedSkill(member.appliedCrewSkills)
            }
            break
      }

      return () => {}
   }, [commander, crewMembers, role, selectedSkills, setSelectedSkill])

   function handleToggleChancge(event: React.MouseEvent<HTMLElement>, newFormats: string[]) {
      setSelectedSkills(newFormats)
   }
   return { handleToggleChancge, selectedSkills }
}

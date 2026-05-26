import Image from 'next/image'
import { useContext, useState } from 'react'
import { CrewContext } from '@/VehicleDetails/Context/CrewContext/CrewContext'

import CrewSkills, { type ICrewRoles } from '@/Classes/CrewSkills'
import HtmlTooltip from '@/helpers/HtmlTooltip'
import TooltipContent from '../Includes/TooltipContent'

export default function SingleCrewSkill({ skill, role }: { skill: CrewSkills; role: ICrewRoles }) {
   const [checked, setChecked] = useState(false)
   const {
      crewDispatch,
      crewReducer: { crewMembers },
   } = useContext(CrewContext)
   function handleClick() {
      if (!checked) {
         if (skill.xmlName === 'brotherhood' || skill.modifiers[0].paramName === 'crewLevelIncrease') {
            crewDispatch({
               type: 'SET_APPLIED_CREW_MODIFIER',
               payload: {
                  name: skill.xmlName,
                  value: skill.modifiers[0].value,
               },
            })
         } else {
            crewDispatch({
               type: 'SET_APPLIED_CREW_SKILLS',
               payload: {
                  appliedSkillName: skill.xmlName,
                  crewSkillModifiers: skill.modifiers,
                  role,
               },
            })
         }
      } else {
         console.log('CHECKED SO REMOVE SKILL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      }

      setChecked((prevChecked) => !prevChecked)
   }

   return (
      <div onClick={handleClick}>
         <HtmlTooltip
            key={skill.xmlName}
            placement='top'
            title={<TooltipContent skill={skill} />}
            disableInteractive
         >
            <Image
               src={`/crewSkills/${skill.xmlName}.png`}
               alt={skill.xmlName}
               width={40}
               height={40}
               className='w-[40px] h-[40px] object-cover'
            />
         </HtmlTooltip>
      </div>
   )
}

import Image from 'next/image'

import CrewSkills from '@/Classes/CrewSkills'
import HtmlTooltip from '@/helpers/HtmlTooltip'
import TooltipContent from '../Includes/TooltipContent'

export default function SingleCrewSkill({ skill }: { skill: CrewSkills }) {
   return (
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
            className='w-[40px] h-[40px] cursor-pointer opacity-70'
         />
      </HtmlTooltip>
   )
}

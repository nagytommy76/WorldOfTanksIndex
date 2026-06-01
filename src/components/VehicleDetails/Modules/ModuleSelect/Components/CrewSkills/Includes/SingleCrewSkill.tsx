import Image from 'next/image'

import CrewSkills from '@/Classes/CrewSkills'
import HtmlTooltip from '@/helpers/HtmlTooltip'
import TooltipContent from '../Includes/TooltipContent'

export default function SingleCrewSkill({
   skill,
   isDisabled = false,
}: {
   skill: CrewSkills
   isDisabled?: boolean
}) {
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
            className={`w-[40px] h-[40px] object-cover ${isDisabled ? 'opacity-40' : 'opacity-100'}`}
         />
      </HtmlTooltip>
   )
}

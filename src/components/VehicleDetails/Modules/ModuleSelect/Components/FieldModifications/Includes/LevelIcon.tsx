import Image from 'next/image'

import tiers from '@/lib/tierList'
import HtmlTooltip from '@/helpers/HtmlTooltip'

import type { IFieldModificationLevel } from '@/src/utils/FieldModifications/groupFieldModificationLevels'
import { LEVEL_ICON_SIZE } from '../Helpers/constants'
import { getImageStateClasses } from '../Helpers/getImageStateClasses'

import LevelTooltip from './Tooltips/LevelTooltip'

/**
 * @description Roman numeral hexagon of a level, rendered as a mark label of the level slider
 */
export default function LevelIcon({
   level,
   isUnlocked,
}: {
   level: IFieldModificationLevel
   isUnlocked: boolean
}) {
   const state = isUnlocked ? 'active' : 'locked'

   return (
      <HtmlTooltip placement='right' title={<LevelTooltip level={level} />} disableInteractive>
         {/* Fixed size: the mark label is a narrow absolute box, it would shrink the image otherwise */}
         <span
            className='relative flex shrink-0 items-center justify-center'
            style={{ width: LEVEL_ICON_SIZE.width, height: LEVEL_ICON_SIZE.height }}
         >
            {/* The middle of the hexagon is translucent, this hides the slider line behind it */}
            <span className='absolute h-8 w-8 rounded-full bg-neutral-900' />
            <Image
               src={`/FieldModification/stepLevels/roman_number_${level.level}.png`}
               alt={`Level ${tiers[level.level - 1]}`}
               width={LEVEL_ICON_SIZE.width}
               height={LEVEL_ICON_SIZE.height}
               draggable={false}
               data-state={state}
               className={`relative max-w-none ${getImageStateClasses(state)}`}
            />
         </span>
      </HtmlTooltip>
   )
}

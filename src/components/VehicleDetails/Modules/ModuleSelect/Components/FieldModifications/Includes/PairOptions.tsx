import Image from 'next/image'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import tiers from '@/lib/tierList'
import HtmlTooltip from '@/helpers/HtmlTooltip'

import type { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'
import useFieldModSelection from '../Hooks/useFieldModSelection'
import { PAIR_IMAGE_SIZE } from '../Helpers/constants'
import { getImageStateClasses, getOptionState } from '../Helpers/getImageStateClasses'
import { getOptionGroupSx } from '../Helpers/toggleStyles'

import FieldModTooltip from './Tooltips/FieldModTooltip'

/**
 * @description The two mutually exclusive setups of a pair modification.
 * Only the chosen setup is colored, choosing one on a locked level unlocks every level up to it.
 */
export default function PairOptions({ step, isUnlocked }: { step: IResolvedTreeStep; isUnlocked: boolean }) {
   const { pairChoices, choosePairOption } = useFieldModSelection()
   const pair = step.modification?.kind === 'pair' ? step.modification : null

   if (!pair) return null

   const chosenXmlId = pairChoices[step.level] ?? null
   const levelName = `Level ${tiers[step.level - 1]}`

   return (
      <ToggleButtonGroup
         exclusive
         value={chosenXmlId}
         onChange={(_event, optionXmlId: number | null) => {
            const foundOptionByXmlId = pair.options.find((option) => option.xmlId === optionXmlId)
            // console.log('CSÁÁÁ FROM CHANGE: optionXmlId ', foundOptionByXmlId)
            choosePairOption(step.level, optionXmlId, foundOptionByXmlId)
         }}
         aria-label={`${levelName} pair modification`}
         sx={getOptionGroupSx(1)}
      >
         {pair.options.map((option) => {
            const isChosen = option.xmlId === chosenXmlId
            const state = getOptionState(isUnlocked, isChosen)

            return (
               <ToggleButton key={option.xmlId} value={option.xmlId} aria-label={option.displayName}>
                  <HtmlTooltip
                     placement='top'
                     title={
                        <FieldModTooltip
                           subtitle={`${levelName} · Pair modification`}
                           title={option.displayName}
                           kpis={option.kpi}
                           cost={step.cost}
                        />
                     }
                     disableInteractive
                  >
                     <Image
                        src={`/FieldModification/pair/${option.imgName}${isChosen ? '' : '_disabled'}.png`}
                        alt={option.displayName}
                        width={PAIR_IMAGE_SIZE}
                        height={PAIR_IMAGE_SIZE}
                        draggable={false}
                        data-state={state}
                        className={getImageStateClasses(state)}
                     />
                  </HtmlTooltip>
               </ToggleButton>
            )
         })}
      </ToggleButtonGroup>
   )
}

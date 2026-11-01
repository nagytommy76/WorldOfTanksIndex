import Image from 'next/image'
import ButtonBase from '@mui/material/ButtonBase'

import tiers from '@/lib/tierList'
import HtmlTooltip from '@/helpers/HtmlTooltip'

import type { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'
import useFieldModSelection from '../Hooks/useFieldModSelection'
import { FEATURE_IMAGE_SIZE, FIELD_MOD_FEATURES } from '../Helpers/constants'
import { getImageStateClasses } from '../Helpers/getImageStateClasses'

import FieldModTooltip from './Tooltips/FieldModTooltip'

/**
 * @description Image of a feature step, e.g. alternate configuration. Clicking it unlocks every level up to it.
 */
export default function FeatureImage({ step, isUnlocked }: { step: IResolvedTreeStep; isUnlocked: boolean }) {
   const { unlockUpTo } = useFieldModSelection()
   const feature = FIELD_MOD_FEATURES[step.action.value]
   const state = isUnlocked ? 'active' : 'locked'
   const levelName = `Level ${tiers[step.level - 1]}`

   if (!feature) return null

   return (
      <HtmlTooltip
         placement='top'
         title={
            <FieldModTooltip
               subtitle={levelName}
               title={feature.title}
               cost={step.cost}
               icon={feature.icon}
            />
         }
         disableInteractive
      >
         <ButtonBase
            aria-label={feature.title}
            onClick={() => unlockUpTo(step.level)}
            sx={{ borderRadius: 1 }}
         >
            <Image
               src={`/FieldModification/base/${feature.image}.png`}
               alt={feature.title}
               width={FEATURE_IMAGE_SIZE.width}
               height={FEATURE_IMAGE_SIZE.height}
               draggable={false}
               data-state={state}
               className={getImageStateClasses(state)}
            />
         </ButtonBase>
      </HtmlTooltip>
   )
}

import tiers from '@/lib/tierList'

import type { IFieldModificationLevel } from '@/src/utils/FieldModifications/groupFieldModificationLevels'
import { FIELD_MOD_FEATURES } from '../../Helpers/constants'
import { humanizeLocName } from '../../Helpers/humanizeLocName'

import FieldModTooltip from './FieldModTooltip'

/**
 * @description What unlocking the level gives: a feature, or a base modification with its stats
 */
export default function LevelTooltip({ level }: { level: IFieldModificationLevel }) {
   const { mainStep, pairStep } = level
   const subtitle = `Level ${tiers[level.level - 1]}`
   const note = pairStep ? 'Unlocks a pair modification with two setups.' : undefined

   if (!mainStep)
      return <FieldModTooltip subtitle={subtitle} title='Pair modification' cost={pairStep?.cost} />

   if (mainStep.action.type === 'feature') {
      const feature = FIELD_MOD_FEATURES[mainStep.action.value]
      return (
         <FieldModTooltip
            subtitle={subtitle}
            title={feature?.title ?? mainStep.action.value}
            cost={mainStep.cost}
            note={note}
         />
      )
   }

   const modification = mainStep.modification
   const baseModification = modification?.kind === 'base' ? modification : null

   return (
      <FieldModTooltip
         subtitle={subtitle}
         title={baseModification ? humanizeLocName(baseModification.locName) : mainStep.action.value}
         kpis={baseModification?.kpi}
         cost={mainStep.cost}
         note={note}
      />
   )
}

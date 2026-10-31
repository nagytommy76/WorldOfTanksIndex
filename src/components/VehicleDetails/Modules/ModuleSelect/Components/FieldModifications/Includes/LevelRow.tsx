import Typography from '@mui/material/Typography'

import type { IFieldModificationLevel } from '@/src/utils/FieldModifications/groupFieldModificationLevels'
import { ROLE_SLOT_FEATURE, ROW_HEIGHT } from '../Helpers/constants'
import { humanizeLocName } from '../Helpers/humanizeLocName'

import FeatureImage from './FeatureImage'
import PairOptions from './PairOptions'
import RoleSlotOptions from './RoleSlotOptions'

interface ILevelRowProps {
   level: IFieldModificationLevel
   isUnlocked: boolean
   roleSlotOptions: string[] | null
}

/**
 * @description One level of the tree, next to its hexagon on the level slider.
 * The base modification of a level has no image, its stats are in the hexagon tooltip.
 */
export default function LevelRow(props: ILevelRowProps) {
   return (
      <div className='flex items-center justify-center' style={{ height: ROW_HEIGHT }}>
         <LevelContent {...props} />
      </div>
   )
}

function LevelContent({ level: { mainStep, pairStep }, isUnlocked, roleSlotOptions }: ILevelRowProps) {
   if (pairStep) return <PairOptions step={pairStep} isUnlocked={isUnlocked} />

   if (mainStep?.action.type === 'feature') {
      if (mainStep.action.value === ROLE_SLOT_FEATURE && roleSlotOptions && roleSlotOptions.length > 0)
         return <RoleSlotOptions step={mainStep} isUnlocked={isUnlocked} categories={roleSlotOptions} />
      return <FeatureImage step={mainStep} isUnlocked={isUnlocked} />
   }

   const modification = mainStep?.modification
   if (modification?.kind === 'base')
      return (
         <Typography variant='caption' className='text-white/60'>
            {humanizeLocName(modification.locName)}
         </Typography>
      )

   return null
}

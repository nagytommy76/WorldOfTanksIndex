import type { IFieldModificationLevel } from '@/FieldModificationUtils/groupFieldModificationLevels'
import useFieldModSelection from '../Hooks/useFieldModSelection'

import LevelSlider from './LevelSlider'
import LevelRow from './LevelRow'

/**
 * @description The level slider (hexagons on a vertical line) with the level rows next to it
 * @param levels Levels of the tree, from level I upwards without gaps
 * @param roleSlotOptions The vehicle's role slot categories, e.g. ['stealth', 'survivability']
 */
export default function FieldModTree({
   levels,
   roleSlotOptions,
}: {
   levels: IFieldModificationLevel[]
   roleSlotOptions: string[] | null
}) {
   const { unlockedLevel } = useFieldModSelection()

   return (
      <div className='flex flex-row gap-3 pt-1'>
         <div className='flex w-[64px] justify-center'>
            <LevelSlider levels={levels} />
         </div>
         <div className='flex flex-col'>
            {levels.map((level) => (
               <LevelRow
                  key={level.level}
                  level={level}
                  isUnlocked={level.level <= unlockedLevel}
                  roleSlotOptions={roleSlotOptions}
               />
            ))}
         </div>
      </div>
   )
}

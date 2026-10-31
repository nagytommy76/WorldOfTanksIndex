import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'

import tiers from '@/lib/tierList'
import type { IFieldModificationLevel } from '@/src/utils/FieldModifications/groupFieldModificationLevels'

import useFieldModSelection from '../Hooks/useFieldModSelection'
import { FIELD_MOD_ORANGE, ROW_HEIGHT } from '../Helpers/constants'

import LevelIcon from './LevelIcon'

/**
 * MUI's vertical slider has its minimum at the bottom, so level L sits at value -L to put level I on top.
 * The start dot (nothing unlocked) sits half a row above level I.
 */
const START_VALUE = -0.5

function toSliderValue(unlockedLevel: number) {
   return unlockedLevel === 0 ? START_VALUE : -unlockedLevel
}

function toUnlockedLevel(sliderValue: number) {
   return Math.floor(-sliderValue)
}

function getAriaValueText(sliderValue: number) {
   const unlockedLevel = toUnlockedLevel(sliderValue)
   return unlockedLevel === 0 ? 'No field modifications' : `Level ${tiers[unlockedLevel - 1]} unlocked`
}

/**
 * @description The vertical line with the level hexagons. Clicking or dragging to a hexagon unlocks every level up to it.
 * Level L is (L - 0.5) * ROW_HEIGHT from the top, the middle of its row in the tree.
 * @param levels Levels of the tree, from level I upwards without gaps
 */
export default function LevelSlider({ levels }: { levels: IFieldModificationLevel[] }) {
   const { unlockedLevel, setUnlockedLevel } = useFieldModSelection()
   const maxLevel = levels[levels.length - 1].level

   // Sorted ascending: with step={null} the arrow keys move between neighbouring marks
   const marks = [
      ...levels.map((level) => ({
         value: -level.level,
         label: <LevelIcon level={level} isUnlocked={level.level <= unlockedLevel} />,
      })),
      { value: START_VALUE, label: <StartDot isActive={unlockedLevel > 0} /> },
   ].sort((first, second) => first.value - second.value)

   return (
      <Slider
         orientation='vertical'
         aria-label='Unlocked field modification level'
         getAriaValueText={getAriaValueText}
         value={toSliderValue(unlockedLevel)}
         onChange={(_event, value: number) => setUnlockedLevel(toUnlockedLevel(value))}
         min={-maxLevel}
         max={START_VALUE}
         step={null}
         marks={marks}
         track='inverted'
         sx={{
            height: (maxLevel - 0.5) * ROW_HEIGHT,
            width: 2,
            mr: 0,
            // track='inverted' keeps the track between the bottom and the thumb and colors the rail instead:
            // the orange rail shows from the thumb up to level I, the gray track covers the locked levels
            '& .MuiSlider-rail': {
               width: 2,
               opacity: 1,
               backgroundColor: FIELD_MOD_ORANGE,
               boxShadow: `0 0 6px ${FIELD_MOD_ORANGE}`,
            },
            '& .MuiSlider-track': {
               width: 2,
               border: 'none',
               backgroundColor: '#525252',
               // Covers the glow of the rail along the locked levels
               boxShadow: '0 0 0 6px var(--color-neutral-900, #171717)',
            },
            '& .MuiSlider-mark': {
               display: 'none',
            },
            '& .MuiSlider-markLabel': {
               left: '50%',
               transform: 'translate(-50%, 50%)',
               lineHeight: 0,
            },
            // Invisible thumb: hover reaches the hexagon below it, dragging still works through the root
            '& .MuiSlider-thumb': {
               width: 44,
               height: 44,
               backgroundColor: 'transparent',
               pointerEvents: 'none',
               '&::before': { boxShadow: 'none' },
               '&:hover, &.Mui-active': { boxShadow: 'none' },
               '&.Mui-focusVisible': { boxShadow: `0 0 0 2px ${FIELD_MOD_ORANGE}` },
            },
         }}
      />
   )
}

function StartDot({ isActive }: { isActive: boolean }) {
   return (
      <Tooltip title='No field modifications' placement='right' disableInteractive>
         <span
            className={`block h-3 w-3 rounded-full border-2 ${
               isActive ? 'border-orange-500 bg-orange-500' : 'border-neutral-500 bg-neutral-900'
            }`}
         />
      </Tooltip>
   )
}

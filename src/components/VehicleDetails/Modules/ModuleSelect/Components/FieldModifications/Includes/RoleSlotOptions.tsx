import Image from 'next/image'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import tiers from '@/lib/tierList'
import HtmlTooltip from '@/helpers/HtmlTooltip'

import type { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'
import useFieldModSelection from '../Hooks/useFieldModSelection'
import { ROLE_SLOT_ICON_SIZE, FIELD_MOD_FEATURES } from '../Helpers/constants'
import { getImageStateClasses, getOptionState } from '../Helpers/getImageStateClasses'
import { getOptionGroupSx } from '../Helpers/toggleStyles'

import FieldModTooltip from './Tooltips/FieldModTooltip'

function capitalize(text: string) {
   return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * @description The role slot level: the vehicle's two role slot categories, one of them can be chosen
 * @param categories The vehicle's customRoleSlotOptions, e.g. ['stealth', 'survivability']
 */
export default function RoleSlotOptions({
   step,
   isUnlocked,
   categories,
}: {
   step: IResolvedTreeStep
   isUnlocked: boolean
   categories: string[]
}) {
   const { roleSlot, chooseRoleSlot } = useFieldModSelection()
   const chosenCategory = roleSlot?.level === step.level ? roleSlot.category : null
   const levelName = `Level ${tiers[step.level - 1]}`

   return (
      <ToggleButtonGroup
         exclusive
         value={chosenCategory}
         onChange={(_event, category: string | null) => chooseRoleSlot(step.level, category)}
         aria-label={`${levelName} role slot`}
         sx={getOptionGroupSx(1)}
      >
         {categories.map((category) => {
            const isChosen = category === chosenCategory
            const state = getOptionState(isUnlocked, isChosen)
            const name = `${capitalize(category)} role slot`
            // The category icons have no dark art, so an available icon stays gray until it is chosen
            const imageClasses = `${getImageStateClasses(state)}${state === 'available' ? ' grayscale' : ''}`

            return (
               <HtmlTooltip
                  key={category}
                  placement='top'
                  title={
                     <FieldModTooltip
                        subtitle={levelName}
                        title={name}
                        cost={step.cost}
                        icon={FIELD_MOD_FEATURES[step.action.value].icon}
                     />
                  }
                  disableInteractive
               >
                  <ToggleButton value={category} aria-label={name} className='w-[80px] h-[80px]'>
                     <Image
                        src={`/icons/details/${category}.png`}
                        alt={name}
                        width={ROLE_SLOT_ICON_SIZE}
                        height={ROLE_SLOT_ICON_SIZE}
                        draggable={false}
                        data-state={state}
                        className={imageClasses}
                     />
                  </ToggleButton>
               </HtmlTooltip>
            )
         })}
      </ToggleButtonGroup>
   )
}

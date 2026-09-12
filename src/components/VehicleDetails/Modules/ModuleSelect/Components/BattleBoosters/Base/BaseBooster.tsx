import type { IDevice } from '@/types/Devices/Devices'

import HtmlTooltip from '@/helpers/HtmlTooltip'
import ReturnTypography from '../../../Includes/ModuleType'
import TooltipTitle from '../../Devices/DeviceGroup/Includes/TooltipTitle/TooltipTitle'

import Typography from '@mui/material/Typography'
import type { BaseSingleBoosterProps } from './BaseSingleBooster'

export default function BaseBooster({
   headerTitle = 'Directives',
   boosters,
   SingleBoosterComponent,
}: BaseBoosterProps) {
   return (
      <>
         <ReturnTypography text={headerTitle} variant='h6' />
         <section className='grid grid-cols-3 gap-1 w-full'>
            {boosters.map((booster) => (
               <HtmlTooltip
                  key={booster.id}
                  placement='top'
                  title={
                     <TooltipTitle
                        selectedDeviceTypeOverlay={'boosters'}
                        modifiers={booster.modifiers}
                        aggregateModifiers={booster.aggregateModifiers}
                        crewSkillModifier={booster.crewSkillModifier}
                        price={booster.price}
                     >
                        <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                           {booster.displayName}
                        </Typography>
                     </TooltipTitle>
                  }
                  disableInteractive
               >
                  <span>
                     <SingleBoosterComponent booster={booster} />
                  </span>
               </HtmlTooltip>
            ))}
         </section>
      </>
   )
}

type BaseBoosterProps = {
   headerTitle?: string
   boosters: IDevice[]
   SingleBoosterComponent: React.ComponentType<Pick<BaseSingleBoosterProps, 'booster'>>
}

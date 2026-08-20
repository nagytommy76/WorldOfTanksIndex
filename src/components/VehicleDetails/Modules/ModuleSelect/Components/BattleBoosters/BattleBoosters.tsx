import type { IDevice } from '@/types/Devices/Devices'

import HtmlTooltip from '@/helpers/HtmlTooltip'
import ReturnTypography from '../../Includes/ModuleType'
import TooltipTitle from '../Devices/DeviceGroup/Includes/TooltipTitle/TooltipTitle'

import Typography from '@mui/material/Typography'

import SingleBooster from './SingleBooster'

export default function BattleBoosters({ battleBoosters }: { battleBoosters: IDevice[] }) {
   return (
      <>
         <ReturnTypography text='Directives' variant='h6' />
         <section className='grid grid-cols-3 gap-1 w-full'>
            {battleBoosters.map((booster) => (
               <HtmlTooltip
                  key={booster.id}
                  placement='top'
                  title={
                     <TooltipTitle
                        selectedDeviceTypeOverlay={'boosters'}
                        modifiers={booster.modifiers}
                        aggregateModifiers={booster.aggregateModifiers}
                     >
                        <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                           {booster.displayName}
                        </Typography>
                     </TooltipTitle>
                  }
                  disableInteractive
               >
                  <span>
                     <SingleBooster booster={booster} />
                  </span>
               </HtmlTooltip>
            ))}
         </section>
      </>
   )
}

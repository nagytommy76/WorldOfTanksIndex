import type { IAggregateModifier, IDevicePrice, IModifier } from '@/types/Devices/Devices'
import type { OverlayTypes } from '../../Types'

import TooltipTitle from './TooltipTitle/TooltipTitle'
import HtmlTooltip from '@/helpers/HtmlTooltip'

import Typography from '@mui/material/Typography'

export default function MenuTooltip({
   children,
   aggregateModifiers,
   modifiers,
   price,
   selectedDeviceTypeOverlay,
   DisplayTextComponent,
}: {
   children: React.ReactNode
   aggregateModifiers: IAggregateModifier[] | null
   modifiers: IModifier[] | null
   price: IDevicePrice
   selectedDeviceTypeOverlay: OverlayTypes
   DisplayTextComponent: React.ReactNode
}) {
   return (
      <HtmlTooltip
         placement='top'
         title={
            <TooltipTitle
               selectedDeviceTypeOverlay={selectedDeviceTypeOverlay}
               modifiers={modifiers}
               aggregateModifiers={aggregateModifiers}
               price={price}
            >
               <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                  {DisplayTextComponent}
               </Typography>
            </TooltipTitle>
         }
         disableInteractive
      >
         <span>{children}</span>
      </HtmlTooltip>
   )
}

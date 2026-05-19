import React from 'react'
import type { OverlayTypes } from '../../../Types'

import HtmlTooltip from '@/helpers/HtmlTooltip'

import Button from '@mui/material/Button'

export default function DeviceButton({
   children,
   selectedDeviceTypeOverlay,
   open,
   handleButtonClick,
   TooltipTitle,
   isBlocked = false,
}: {
   TooltipTitle: React.ReactNode
   children: React.ReactNode
   selectedDeviceTypeOverlay: OverlayTypes
   open: boolean
   isBlocked: boolean
   handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
   return (
      <HtmlTooltip placement='top' title={TooltipTitle} disableInteractive>
         <span>
            <Button
               disabled={isBlocked}
               id='equipment-button'
               aria-controls={open ? 'equipment-menu' : undefined}
               aria-haspopup='true'
               aria-expanded={open ? 'true' : undefined}
               onClick={handleButtonClick}
               sx={{
                  border:
                     selectedDeviceTypeOverlay !== 'none' ? '1px solid #e6c40360' : '1px solid transparent',
                  padding: 0,
                  width: 65,
                  height: 65,
                  opacity: isBlocked ? 0.5 : 1,
               }}
            >
               {children}
            </Button>
         </span>
      </HtmlTooltip>
   )
}

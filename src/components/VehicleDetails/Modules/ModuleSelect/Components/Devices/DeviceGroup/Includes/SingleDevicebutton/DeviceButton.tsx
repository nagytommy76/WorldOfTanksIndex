import React from 'react'
import type { OverlayTypes } from '../../../Types'
import { styled } from '@mui/material/styles'

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
   [`& .${tooltipClasses.tooltip}`]: {
      padding: 0,
   },
}))

export default function DeviceButton({
   children,
   selectedDeviceTypeOverlay,
   open,
   handleButtonClick,
   TooltipTitle,
}: {
   TooltipTitle: React.ReactNode
   children: React.ReactNode
   selectedDeviceTypeOverlay: OverlayTypes
   open: boolean
   handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
   return (
      <HtmlTooltip placement='top' title={TooltipTitle} disableInteractive>
         <Button
            id='equipment-button'
            aria-controls={open ? 'equipment-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleButtonClick}
            sx={{
               border: selectedDeviceTypeOverlay !== 'none' ? '1px solid #e6c40360' : '1px solid transparent',
               padding: 0,
               width: 65,
               height: 65,
            }}
         >
            {children}
         </Button>
      </HtmlTooltip>
   )
}

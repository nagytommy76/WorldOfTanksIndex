import React from 'react'
import type { OverlayTypes } from '../../Types'

import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

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
      <Tooltip title={TooltipTitle}>
         <Button
            id='equipment-button'
            aria-controls={open ? 'equipment-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleButtonClick}
            sx={{
               border: selectedDeviceTypeOverlay !== 'none' ? '1px solid #e6c40360' : '1px solid transparent',
            }}
         >
            {children}
         </Button>
      </Tooltip>
   )
}

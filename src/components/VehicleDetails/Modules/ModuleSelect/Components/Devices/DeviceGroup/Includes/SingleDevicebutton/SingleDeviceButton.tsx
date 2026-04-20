import React, { Dispatch, SetStateAction, useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import HandleButtonClick from '../../Functions/HandleButtonClick'

import MenuItemOverlay from '../MenuItemOverlay'
import DeviceButton from './DeviceButton'
import TooltipTitle from '../TooltipTitle/TooltipTitle'

import Typography from '@mui/material/Typography'
import type { OverlayTypes } from '../../../Types'
import type { IDevice } from '@/types/Devices/Devices'

export default function SingleDeviceButton({
   selectedDevice,
   selectedDeviceTypeOverlay,
   open,
   isBlocked,
   setAnchorEl,
}: {
   selectedDevice: IDevice
   selectedDeviceTypeOverlay: OverlayTypes
   isBlocked: boolean
   open: boolean
   setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}) {
   const handleButtonClick = HandleButtonClick(isBlocked, selectedDeviceTypeOverlay, setAnchorEl)
   const { supplySlotCategory } = useContext(VehicleContext)

   return (
      <DeviceButton
         selectedDeviceTypeOverlay={selectedDeviceTypeOverlay}
         isBlocked={isBlocked}
         open={open}
         handleButtonClick={handleButtonClick}
         TooltipTitle={
            <TooltipTitle
               selectedDeviceTypeOverlay={selectedDeviceTypeOverlay}
               modifiers={selectedDevice.modifiers}
               aggregateModifiers={selectedDevice.aggregateModifiers}
            >
               <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                  {selectedDeviceTypeOverlay === 'equipmentTrophyUpgraded'
                     ? `Upgraded ${selectedDevice.displayName}`
                     : selectedDevice.displayName}
               </Typography>
            </TooltipTitle>
         }
      >
         {supplySlotCategory && selectedDeviceTypeOverlay === 'supplySlotActive' ? (
            <MenuItemOverlay
               overlayType='supplySlotActive'
               supplySlotIconName={supplySlotCategory}
               altName={selectedDevice.name}
               icon={selectedDevice.icon}
            />
         ) : (
            <MenuItemOverlay
               overlayType={selectedDeviceTypeOverlay}
               altName={selectedDevice.name}
               icon={selectedDevice.icon}
            />
         )}
      </DeviceButton>
   )
}

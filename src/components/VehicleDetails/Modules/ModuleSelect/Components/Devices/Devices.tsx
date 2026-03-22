'use client'
import { useState } from 'react'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes } from './Types'

import ReturnTypography from '../../Includes/ModuleType'

import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'

import MenuItemOverlay from './Includes/MenuItemOverlay'
import SingleMenuItem from './Includes/SingleMenuItem'

import useGetDevices from './Hooks/useGetDevices'

function DeviceGroup({
   devices,
   // selectedDevices,
   // addDeviceToMap,
   addSelectedDevice,
}: {
   devices: IDevice[]
   // selectedDevices: Map<string, IDevice>
   // addDeviceToMap(device: IDevice): void
   addSelectedDevice(deviceId: number, deviceCategory: string): void
}) {
   // const foundModernized = devices.find((device) => device.deviceType === 'modernized')
   const foundTiers = devices.find((device) => device.deviceType === 'tiers') as IDevice
   const foundDeluxe = devices.find((device) => device.deviceType === 'deluxe')
   const foundBasicTrophy = devices.find(
      (device) => device.deviceType === 'trophy' && device.tags?.includes('trophyBasic'),
   )
   const foundUpgradedTrophy = devices.find(
      (device) => device.deviceType === 'trophy' && device.tags?.includes('trophyUpgraded'),
   )

   const foundDevices = {
      tiers: foundTiers,
      equipmentTrophyBasic: foundBasicTrophy,
      equipmentTrophyUpgraded: foundUpgradedTrophy,
      equipmentPlus: foundDeluxe,
   }

   const [selectedDeviceType, setSelectedDeviceType] = useState<OverlayTypes>('none')
   const [selectedDevice, setSelectedDevice] = useState(foundDevices.tiers)

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   function handleSelectAndClose(deviceType: OverlayTypes) {
      setAnchorEl(null)

      if (deviceType === 'none') {
         setSelectedDevice(foundDevices['tiers'])
         // addDeviceToMap(foundDevices['tiers'])
         // addSelectedDevice(0, foundDevices[deviceType].tags[0])
      } else {
         setSelectedDevice(foundDevices[deviceType])
         // addDeviceToMap(foundDevices[deviceType])
         addSelectedDevice(foundDevices[deviceType].id, foundDevices[deviceType].tags[0])
      }
      setSelectedDeviceType(deviceType)
   }

   const handleClose = (deviceType: OverlayTypes, reason: 'backdropClick' | 'escapeKeyDown') => {
      setAnchorEl(null)
      if (reason === 'backdropClick') return
      setSelectedDeviceType(deviceType)
   }

   if (!selectedDevice) return null

   return (
      <>
         <Tooltip
            title={
               <>
                  <Typography textAlign={'center'} variant='h6' fontSize={12}>
                     {selectedDevice.displayName}
                  </Typography>
                  <div className=''>
                     here comes the modifiers, and aggregateModifiers vehicleCamouflage: value: 1.06
                  </div>
               </>
            }
         >
            <Button
               id='equipment-button'
               aria-controls={open ? 'equipment-menu' : undefined}
               aria-haspopup='true'
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
               sx={{
                  border: selectedDeviceType !== 'none' ? '1px solid #e6c40360' : '1px solid transparent',
               }}
            >
               <MenuItemOverlay
                  overlayType={selectedDeviceType}
                  altName={selectedDevice.name}
                  icon={selectedDevice.icon}
               />
            </Button>
         </Tooltip>
         <Menu
            id='equipment-selection-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={(event, reason) => handleClose('none', reason)}
            slotProps={{
               list: {
                  'aria-labelledby': 'Equipment selection',
               },
            }}
         >
            <SingleMenuItem
               displayName={'Deselect equipment'}
               handleClose={() => handleSelectAndClose('none')}
            >
               <MenuItemOverlay overlayType='none' altName={'empty_loadout'} icon={'empty_loadout'} />
            </SingleMenuItem>
            {Object.entries(foundDevices).map(
               ([deviceType, device]) =>
                  device !== undefined && (
                     <SingleMenuItem
                        key={deviceType}
                        displayName={device.displayName}
                        handleClose={() => handleSelectAndClose(deviceType as OverlayTypes)}
                     >
                        <MenuItemOverlay
                           overlayType={deviceType as OverlayTypes}
                           altName={device.name}
                           icon={device.icon}
                        />
                     </SingleMenuItem>
                  ),
            )}
         </Menu>
      </>
   )
}

export default function Devices() {
   const allGroupedDevices = useGetDevices()
   // const [selectedDevices, setSelectedDevices] = useState<Map<string, IDevice>>(new Map())
   const [selectedDevices, setSelectedDevices] = useState<{
      [key: string]: number
   }>({})
   if (!allGroupedDevices) return null

   function addSelectedDevice(deviceId: number, deviceCategory: string) {
      if (deviceId === 0 && deviceCategory === 'none') {
         delete selectedDevices[deviceCategory]
         setSelectedDevices(selectedDevices)
      }

      setSelectedDevices({
         ...selectedDevices,
         [deviceCategory]: deviceId,
      })
   }

   // function addDeviceToMap(device: IDevice | undefined) {
   //    const newSelectedDevicesMap = new Map(selectedDevices)

   //    if (!device) {
   //       setSelectedDevices(newSelectedDevicesMap)
   //       newSelectedDevicesMap.clear()
   //       return
   //    }

   //    if (newSelectedDevicesMap.size >= 3) {
   //       return
   //    } else {
   //       setSelectedDevices(selectedDevices.set(device.tags[0], device))
   //    }
   //    setSelectedDevices(newSelectedDevicesMap)
   // }

   console.log(allGroupedDevices)

   return (
      <>
         <ReturnTypography text='Compatible Devices' />
         <section className='grid grid-cols-4 gap-2'>
            {Object.entries(allGroupedDevices).map(([deviceArcheType, devices]) => (
               <DeviceGroup
                  key={deviceArcheType}
                  devices={devices}
                  addSelectedDevice={addSelectedDevice}
                  // addDeviceToMap={addDeviceToMap}
                  // selectedDevices={selectedDevices}
               />
            ))}
         </section>
      </>
   )
}

'use client'
// import Image from 'next/image'
import { useContext, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes } from './Types'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import ReturnTypography from '../../Includes/ModuleType'

import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'

import MenuItemOverlay from './Includes/MenuItemOverlay'
import SingleMenuItem from './Includes/SingleMenuItem'

function DeviceGroup({ devices }: { devices: IDevice[] }) {
   const foundModernized = devices.find((device) => device.deviceType === 'modernized')
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
      equipmentPlus: foundDeluxe,
      equipmentTrophyBasic: foundBasicTrophy,
      equipmentTrophyUpgraded: foundUpgradedTrophy,
      equipmentModernized_1: foundModernized,
      equipmentModernized_2: foundModernized,
      equipmentModernized_3: foundModernized,
   }

   const [selectedDeviceType, setSelectedDeviceType] = useState<OverlayTypes>('none')
   const [selectedDevice, setSelectedDevice] = useState(foundDevices.tiers)

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   function handleClose(deviceType: OverlayTypes) {
      setAnchorEl(null)
      setSelectedDeviceType(deviceType)
      setSelectedDevice(foundDevices[deviceType])
   }

   const handleSelectAndClose = (deviceType: OverlayTypes, reason: 'backdropClick' | 'escapeKeyDown') => {
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
            onClose={(event, reason) => handleSelectAndClose('none', reason)}
            slotProps={{
               list: {
                  'aria-labelledby': 'Equipment selection',
               },
            }}
         >
            <SingleMenuItem displayName={'Deselect equipment'} handleClose={() => handleClose('none')}>
               <MenuItemOverlay overlayType='none' altName={'empty_loadout'} icon={'empty_loadout'} />
            </SingleMenuItem>
            <SingleMenuItem displayName={foundTiers.displayName} handleClose={() => handleClose('tiers')}>
               <MenuItemOverlay overlayType='none' altName={foundTiers.name} icon={foundTiers.icon} />
            </SingleMenuItem>

            {foundBasicTrophy && (
               <SingleMenuItem
                  displayName={foundBasicTrophy.displayName}
                  handleClose={() => handleClose('equipmentTrophyBasic')}
               >
                  <MenuItemOverlay
                     overlayType='equipmentTrophyBasic'
                     altName={foundBasicTrophy.name}
                     icon={foundBasicTrophy.icon}
                  />
               </SingleMenuItem>
            )}
            {foundUpgradedTrophy && (
               <SingleMenuItem
                  displayName={foundUpgradedTrophy.displayName}
                  handleClose={() => handleClose('equipmentTrophyUpgraded')}
               >
                  <MenuItemOverlay
                     overlayType='equipmentTrophyUpgraded'
                     altName={foundUpgradedTrophy.name}
                     icon={foundUpgradedTrophy.icon}
                  />
               </SingleMenuItem>
            )}
            {foundDeluxe && (
               <SingleMenuItem
                  displayName={foundDeluxe.displayName}
                  handleClose={() => handleClose('equipmentPlus')}
               >
                  <MenuItemOverlay
                     overlayType='equipmentPlus'
                     altName={foundDeluxe.name}
                     icon={foundDeluxe.icon}
                  />
               </SingleMenuItem>
            )}
         </Menu>
      </>
   )
}

export default function Devices() {
   const { provisions } = useContext(VehicleContext)

   const { data } = useQuery<{ data: { groupedDevices: { [deviceArcheType: string]: IDevice[] } } }>({
      queryKey: ['provisions', provisions],
      queryFn: () =>
         axiosInstance.get('/devices', {
            params: { provisions: JSON.stringify(provisions) },
         }),
   })

   if (!data?.data) return null
   console.log(data.data.groupedDevices)

   return (
      <>
         <ReturnTypography text='Compatible Devices' />
         <section className='grid grid-cols-4 gap-2'>
            {Object.entries(data.data.groupedDevices).map(([deviceArcheType, devices]) => (
               <DeviceGroup key={deviceArcheType} devices={devices} />
            ))}
         </section>
      </>
   )
}

'use client'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { IDevice } from '@/types/Devices/Devices'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import ReturnTypography from '../../Includes/ModuleType'

import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'

import MenuItemOverlay from './Includes/MenuItemOverlay'

function DeviceGroup({ devices }: { devices: IDevice[] }) {
   const foundTiers = devices.find((device) => device.deviceType === 'tiers')
   const foundDeluxe = devices.find((device) => device.deviceType === 'deluxe')
   const foundBasicTrophy = devices.find(
      (device) => device.deviceType === 'trophy' && device.tags?.includes('trophyBasic'),
   )
   const foundUpgradedTrophy = devices.find(
      (device) => device.deviceType === 'trophy' && device.tags?.includes('trophyUpgraded'),
   )

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   if (!foundTiers) return null

   return (
      <>
         <Tooltip title={foundTiers.displayName}>
            <Button
               id='basic-button'
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup='true'
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
            >
               <Image
                  src={`/icons/vehicle_modifiers/equipments/${foundTiers.icon}.png`}
                  alt={foundTiers.name}
                  width={50}
                  height={50}
               />
            </Button>
         </Tooltip>
         <Menu
            id='equipment-selection-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
               list: {
                  'aria-labelledby': 'Equipment selection',
               },
            }}
         >
            <MenuItemOverlay
               overlayType='none'
               displayName={foundTiers.displayName}
               altName={foundTiers.name}
               icon={foundTiers.icon}
               handleClose={handleClose}
            />
            {foundBasicTrophy && (
               <MenuItemOverlay
                  displayName={foundBasicTrophy.displayName}
                  altName={foundBasicTrophy.name}
                  icon={foundBasicTrophy.icon}
                  handleClose={handleClose}
               />
            )}
            {foundUpgradedTrophy && (
               <MenuItemOverlay
                  overlayType='equipmentTrophyUpgraded'
                  displayName={foundUpgradedTrophy.displayName}
                  altName={foundUpgradedTrophy.name}
                  icon={foundUpgradedTrophy.icon}
                  handleClose={handleClose}
               />
            )}
            {foundDeluxe && (
               <MenuItemOverlay
                  overlayType='equipmentPlus'
                  altName={foundDeluxe.name}
                  displayName={foundDeluxe.displayName}
                  icon={foundDeluxe.icon}
                  handleClose={handleClose}
               />
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
         <ReturnTypography text='Devices' />
         <section className='grid grid-cols-4 gap-2'>
            {Object.entries(data.data.groupedDevices).map(([deviceArcheType, devices]) => (
               <DeviceGroup key={deviceArcheType} devices={devices} />
            ))}
         </section>
      </>
   )
}

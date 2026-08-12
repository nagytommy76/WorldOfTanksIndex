'use client'
import useGetDevices from './Hooks/useGetDevices'
import useMaxDevices from './Hooks/useMaxDevices'
import useHandleSelectedDevice from './Hooks/useHandleSelectedDevice'
import type { DeviceModifierKeys } from '@/VehicleContext/DevicesContext/Types'

import Typography from '@mui/material/Typography'

import ReturnTypography from '../../Includes/ModuleType'
import DeviceGroup from './DeviceGroup/DeviceGroup'

export default function Devices() {
   const allGroupedDevices = useGetDevices()
   const maxDevices = useMaxDevices()
   const { addSelectedDevice, selectedDevices, selectedCount } = useHandleSelectedDevice(maxDevices)

   if (!allGroupedDevices) return null

   return (
      <section className='w-[330px] xl:w-[265px] p-2'>
         <ReturnTypography text='Compatible Devices' variant='h4' />
         <Typography
            variant='caption'
            color='text.secondary'
            className={`text-center mb-2
            ${selectedCount >= maxDevices ? 'text-red-400' : 'text-green-400'}
            `}
         >
            {selectedCount} / {maxDevices} devices selected
         </Typography>
         <section className='grid grid-cols-4 gap-1'>
            {Object.entries(allGroupedDevices).map(([deviceArcheType, devices]) => (
               <DeviceGroup
                  selectedDevices={selectedDevices}
                  key={deviceArcheType}
                  archeType={deviceArcheType as DeviceModifierKeys}
                  devices={devices}
                  isBlocked={
                     selectedCount >= maxDevices && selectedDevices
                        ? !(deviceArcheType in selectedDevices)
                        : false
                  }
                  addSelectedDevice={addSelectedDevice}
                  selectedCount={selectedCount}
               />
            ))}
         </section>
      </section>
   )
}

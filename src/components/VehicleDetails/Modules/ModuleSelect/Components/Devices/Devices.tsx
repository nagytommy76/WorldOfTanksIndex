'use client'
import useGetDevices from './Hooks/useGetDevices'
import useMaxDevices from './Hooks/useMaxDevices'
import useHandleSelectedDevice from './Hooks/useHandleSelectedDevice'

import Typography from '@mui/material/Typography'

import ReturnTypography from '../../Includes/ModuleType'
import DeviceGroup from './DeviceGroup/DeviceGroup'

export default function Devices() {
   const allGroupedDevices = useGetDevices()
   const maxDevices = useMaxDevices()
   const { addSelectedDevice, selectedDevices, selectedCount } = useHandleSelectedDevice(maxDevices)

   if (!allGroupedDevices) return null

   return (
      <>
         <ReturnTypography text='Compatible Devices' />
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
                  key={deviceArcheType}
                  archeType={deviceArcheType}
                  devices={devices}
                  isBlocked={selectedCount >= maxDevices && !(deviceArcheType in selectedDevices)}
                  addSelectedDevice={addSelectedDevice}
               />
            ))}
         </section>
      </>
   )
}

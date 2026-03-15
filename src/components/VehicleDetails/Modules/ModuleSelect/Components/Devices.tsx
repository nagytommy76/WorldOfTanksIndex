'use client'
import Image from 'next/image'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { IDevice } from '@/types/Devices/Devices'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import ReturnTypography from '../Includes/ModuleType'

import Tooltip from '@mui/material/Tooltip'

export default function Devices() {
   const { provisions } = useContext(VehicleContext)

   const { data } = useQuery<{ data: { groupedDevices: { [deviceArcheType: string]: IDevice[] } } }>({
      queryKey: ['provisions', provisions],
      queryFn: () =>
         axiosInstance.get('/devices', {
            params: { provisions: JSON.stringify(provisions) },
         }),
   })

   console.log(data?.data.groupedDevices)

   if (!data?.data) return null

   return (
      <>
         <ReturnTypography text='Devices' />
         <section className='grid grid-cols-4 gap-2'>
            {Object.entries(data.data.groupedDevices).map(([deviceArcheType, devices]) => (
               <>
                  {devices.map((device) => (
                     <Tooltip key={device.id} title={device.displayName}>
                        <div className='bg-neutral-600/40 rounded-md p-1'>
                           <Image
                              src={`/icons/vehicle_modifiers/equipments/${device.icon}.png`}
                              alt={device.name}
                              width={50}
                              height={50}
                              onError={(error) => {
                                 console.log('error:::: ', error)
                              }}
                           />
                        </div>
                     </Tooltip>
                  ))}
               </>
            ))}
         </section>
      </>
   )
}

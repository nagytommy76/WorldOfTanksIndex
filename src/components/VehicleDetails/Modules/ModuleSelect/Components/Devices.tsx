'use client'
import Image from 'next/image'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { IDevice } from '@/types/Devices/Devices'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import ReturnTypography from '../Includes/ModuleType'

import Tooltip from '@mui/material/Tooltip'

function DeviceGroup({ devices }: { devices: IDevice[] }) {
   const foundTiers = devices.find((device) => device.deviceType === 'tiers')
   const foundDeluxe = devices.find((device) => device.deviceType === 'deluxe')
   const foundTrophy = devices.find((device) => device.deviceType === 'trophy')

   // if (!foundTiers || !foundDeluxe || !foundTrophy) return null

   if (foundTiers)
      return (
         <>
            <Tooltip title={foundTiers.displayName}>
               <div className='bg-neutral-600/40 rounded-md p-1'>
                  <Image
                     src={`/icons/vehicle_modifiers/equipments/${foundTiers.icon}.png`}
                     alt={foundTiers.name}
                     width={50}
                     height={50}
                  />
               </div>
            </Tooltip>
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
               <>
                  <DeviceGroup devices={devices} />
                  {/* {devices.map((device) => (
                     <Tooltip key={device.id} title={device.displayName}>
                        <div className='bg-neutral-600/40 rounded-md p-1'>
                           <Image
                              src={`/icons/vehicle_modifiers/equipments/${device.icon}.png`}
                              alt={device.name}
                              width={50}
                              height={50}
                           />
                        </div>
                     </Tooltip>
                  ))} */}
               </>
            ))}
         </section>
      </>
   )
}

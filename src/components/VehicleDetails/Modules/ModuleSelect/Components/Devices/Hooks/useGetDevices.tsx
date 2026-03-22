import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import type { IDevice } from '@/types/Devices/Devices'

export default function useGetDevices() {
   const { provisions } = useContext(VehicleContext)

   const { data } = useQuery<{ data: { groupedDevices: { [deviceArcheType: string]: IDevice[] } } }>({
      queryKey: ['provisions', provisions],
      queryFn: () =>
         axiosInstance.get('/devices', {
            params: { provisions: JSON.stringify(provisions) },
         }),
   })

   return data?.data.groupedDevices
}

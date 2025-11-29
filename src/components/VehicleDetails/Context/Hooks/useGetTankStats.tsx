import axios from '@/ProvidersAxiosProvider'
import { useSuspenseQuery } from '@tanstack/react-query'

import type { ITankData } from '@/types/VehicleDetails/Vehicle'
import { AxiosResponse } from 'axios'

export default function useGetTankStats(tank_short_name: string, tank_id: string) {
   async function getTankStats() {
      const response = (await axios.get(`/${tank_id}/${tank_short_name}`)) as AxiosResponse<{
         vehicleStats: ITankData
      }>

      return response.data.vehicleStats
   }

   const { data, isLoading, isError } = useSuspenseQuery({
      queryKey: ['tank-stats', tank_short_name],
      queryFn: getTankStats,
   })

   return { data, isLoading, isError }
}

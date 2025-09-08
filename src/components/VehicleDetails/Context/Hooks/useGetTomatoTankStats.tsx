import axios from '@/ProvidersAxiosProvider'
import { useQuery } from '@tanstack/react-query'

import { useState, useEffect } from 'react'

import type { ITomatoTankStats } from '@/types/VehicleDetails/tomatoGGTankStats'

// https://tomato.gg/_next/data/MibomUS6JqK7jWsXG9--J/en/tanks/9745/e-75/EU.json?tankId=9745&name=e-75&server=EU
// https://tomato.gg/_next/data/MibomUS6JqK7jWsXG9--J/en/tank-stats.json

export default function useGetTomatoTankStats(tank_short_name: string, tank_id: string) {
   const [tomatoTankStats, setTomatoTankStats] = useState<ITomatoTankStats>({} as ITomatoTankStats)
   async function getTomatoTankStats() {
      const response = (await axios.get(`/${tank_id}/${tank_short_name}`)) as { data: ITomatoTankStats }
      return response.data
   }

   const { data, isError } = useQuery({
      queryKey: ['tomato-tank-stats', tank_short_name],
      queryFn: getTomatoTankStats,
   })

   useEffect(() => {
      if (!isError && data) setTomatoTankStats(data)
   }, [data, isError])

   return tomatoTankStats
}

import axios from '@/ProvidersAxiosProvider'
import { useQuery } from '@tanstack/react-query'

import { useContext } from 'react'
import { ModuleContext } from '@/ModuleContext/ModuleContext'

import type { ITomatoTankStats } from '@/types/VehicleDetails/tomatoGGTankStats'

// https://tomato.gg/_next/data/MibomUS6JqK7jWsXG9--J/en/tanks/9745/e-75/EU.json?tankId=9745&name=e-75&server=EU
// https://tomato.gg/_next/data/MibomUS6JqK7jWsXG9--J/en/tank-stats.json

export default function useGetTomatoTankStats() {
   const { tank_short_name, tank_id } = useContext(ModuleContext)
   async function getTomatoTankStats() {
      const response = (await axios.get(`/${tank_id}/${tank_short_name}`)) as ITomatoTankStats
      return response
   }

   const { data } = useQuery({
      queryKey: ['tomato-tank-stats', tank_short_name],
      queryFn: getTomatoTankStats,
   })

   return data
}

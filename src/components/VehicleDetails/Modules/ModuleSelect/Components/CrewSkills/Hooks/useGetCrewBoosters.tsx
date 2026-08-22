import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import type { IDevice } from '@/types/Devices/Devices'

export default function useGetCrewBoosters() {
   const { provisions } = useContext(VehicleContext)

   const { data } = useQuery<{ data: { battleBoosters: IDevice[] } }>({
      queryKey: ['crewSkillBattleBooster'],
      queryFn: () =>
         axiosInstance.get('/battle_boosters', {
            params: {
               boosterType: JSON.stringify('crewSkillBattleBooster'),
               provisions: JSON.stringify(provisions),
            },
         }),
   })

   return data?.data.battleBoosters
}

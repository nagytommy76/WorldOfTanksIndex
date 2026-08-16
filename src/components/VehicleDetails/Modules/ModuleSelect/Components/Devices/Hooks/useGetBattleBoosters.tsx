import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'
import type { IDevice } from '@/types/Devices/Devices'

export default function useGetBattleBoosters() {
   const { provisions } = useContext(VehicleContext)

   const { data } = useQuery<{ data: { battleBoosters: IDevice[] } }>({
      queryKey: ['equipmentBattleBooster'],
      queryFn: () =>
         axiosInstance.get('/battle_boosters', {
            params: {
               boosterType: JSON.stringify('equipmentBattleBooster'),
               provisions: JSON.stringify(provisions),
            },
         }),
   })

   return data?.data.battleBoosters
}

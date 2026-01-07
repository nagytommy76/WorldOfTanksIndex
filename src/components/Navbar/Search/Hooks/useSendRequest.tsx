import axiosInstance from '@/ProvidersAxiosProvider'
import { useQuery } from '@tanstack/react-query'
import type { RequestData } from '../Types'

export default function useSendRequest(inputValue: string, isEnabled: boolean) {
   async function searchFunction() {
      const { data } = (await axiosInstance.get('/search', { params: { vehicleName: inputValue } })) as {
         data: { foundTanks: RequestData[] }
      }
      return data
   }

   const { data } = useQuery({
      queryKey: ['search-for-vehicles', isEnabled, inputValue],
      queryFn: searchFunction,
      enabled: isEnabled && inputValue.length > 0,
   })

   return data
}

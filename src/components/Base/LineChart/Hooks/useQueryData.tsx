import type { IMoe, IMastery } from '@/types/MOE/moeTypes'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
// import getPoliroid from '@/lib/getPoliroid'

async function fetchAllData(
   tank_id: number,
   type: 'gunmarks' | 'mastery',
   server: 'eu' | 'com' | 'asia' = 'eu'
) {
   const URL = `https://poliroid.me/${type}/api/v2/data/${server}/vehicle/${tank_id}${
      type === 'gunmarks' ? '/65,85,95,100' : ''
   }`

   const vehicleMarks = await fetch(URL, { method: 'GET' })
   if (!vehicleMarks.ok) {
      throw new Error('Network response was not ok')
   }

   return vehicleMarks.json()
}

export default function useQueryData(data: IMoe[] | IMastery[], server: 'eu' | 'com' | 'asia' = 'eu') {
   const pathname = usePathname().split('/')

   const { data: allData } = useQuery({
      queryKey: [`getAllData-${pathname[3]}`, server, pathname[3]],
      queryFn: () => fetchAllData(Number(pathname[1]), pathname[3] as 'gunmarks' | 'mastery', server),
      initialData: server === 'eu' ? data : undefined,
      placeholderData: data,
   })
   if (Object.hasOwn(allData, 'data')) {
      return { allData: allData.data.data }
   }

   return { allData }
}

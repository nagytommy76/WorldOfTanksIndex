import type { IMastery, IMoe } from '@/types/MOE/moeTypes'

export default async function getPoliroid(
   tank_id: number,
   type: 'gunmarks' | 'mastery'
): Promise<IMoe[] | IMastery[] | undefined> {
   try {
      const URL = `https://poliroid.me/${type}/api/v2/data/eu/vehicle/${tank_id}${
         type === 'gunmarks' ? '/65,85,95,100' : ''
      }`
      const vehicleMarks = await fetch(URL, { method: 'GET' })
      const response = (await vehicleMarks.json()) as Promise<{ data: { data: IMoe[] | IMastery[] } }>

      return (await response)?.data?.data
   } catch (error: unknown) {
      console.log(error)
      return undefined
   }
}

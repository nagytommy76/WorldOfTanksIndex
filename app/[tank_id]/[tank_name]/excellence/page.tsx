import type { IMoe } from '@/types/MOE/moeTypes'
import type { Metadata } from 'next'

import Moe from '@/components/Moe/Moe'

type Params = Promise<{ tank_id: string; tank_name: string }>
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const { tank_name } = await params
   const tankName = tank_name?.split('_').slice(1).join(' ')
   return {
      title: `${tankName} | Marks of Excellence | World of Tanks Index`,
      description: `Vehicle details for ${tankName} with WN8, Marks of Excellence and Modules.`,
   }
}

async function getMarksOfExcellence(tank_id: number) {
   const URL = `https://poliroid.me/gunmarks/api/v2/data/eu/vehicle/${tank_id}/65,85,95,100`
   const vehicleMarks = await fetch(URL, { method: 'GET' })
   const response = (await vehicleMarks.json()) as Promise<{ data: { data: IMoe[] } }>
   return (await response).data.data
}

export default async function page({ params }: { params: Params }) {
   const { tank_id } = await params
   const marksOfExcellence = await getMarksOfExcellence(Number(tank_id))
   marksOfExcellence.reverse()

   console.log(marksOfExcellence)
   return (
      <div>
         {/* <Moe marksOfExcellence={marksOfExcellence} /> */}
         <Moe data={marksOfExcellence} />
      </div>
   )
}

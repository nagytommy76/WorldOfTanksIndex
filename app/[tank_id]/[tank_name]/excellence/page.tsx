import type { IMoe } from '@/types/MOE/moeTypes'
import type { Metadata } from 'next'

import Typography from '@mui/material/Typography'

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

async function getMarksOfExcellence(tank_id: number): Promise<IMoe[] | undefined> {
   try {
      const URL = `https://poliroid.me/gunmarks/api/v2/data/eu/vehicle/${tank_id}/65,85,95,100`
      const vehicleMarks = await fetch(URL, { method: 'GET' })
      const response = (await vehicleMarks.json()) as Promise<{ data: { data: IMoe[] } }>

      return (await response)?.data?.data
   } catch (error: unknown) {
      console.log(error)
      return undefined
   }
}

export default async function page({ params }: { params: Params }) {
   const { tank_id, tank_name } = await params
   const tankName = tank_name?.split('_').slice(1).join(' ')
   const marksOfExcellence = await getMarksOfExcellence(Number(tank_id))

   if (!marksOfExcellence)
      return (
         <section
            className='py-12 px-6'
            style={{
               borderRadius: 5,
               background: 'radial-gradient(1200px 400px at 50% 0%, #1a253f 0%, #0b1220 45%, #050813 100%)',
            }}
         >
            <header style={{ textAlign: 'center', marginBottom: 12 }} className='relative'>
               <Typography gutterBottom variant='h5' fontWeight={700}>
                  {tankName} has no marks of excellence, only above Tier V
               </Typography>
            </header>
         </section>
      )

   marksOfExcellence.reverse()

   return <Moe marksOfExcellence={marksOfExcellence} />
}

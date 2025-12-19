import type { Metadata } from 'next'
import type { IMoe } from '@/types/MOE/moeTypes'
import type { Params } from '@/types/types'

import getPoliroid from '@/lib/getPoliroid'

import Typography from '@mui/material/Typography'

import Moe from '@/components/Moe/Moe'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const { tank_name } = await params
   const tankName = tank_name?.split('_').slice(1).join(' ')
   return {
      title: `${tankName} | Marks of Excellence | World of Tanks Index`,
      description: `Vehicle details for ${tankName} with WN8, Marks of Excellence and Modules.`,
   }
}

export default async function page({ params }: { params: Params }) {
   const { tank_id, tank_name } = await params
   const tankName = tank_name?.split('_').slice(1).join(' ')
   const marksOfExcellence = (await getPoliroid(Number(tank_id), 'gunmarks')) as IMoe[]

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
   return <Moe marksOfExcellence={marksOfExcellence} />
}

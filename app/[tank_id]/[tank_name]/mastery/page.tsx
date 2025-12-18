import type { Metadata } from 'next'
import type { Params } from '@/types/types'
import type { IMastery } from '@/types/MOE/moeTypes'

import getPoliroid from '@/lib/getPoliroid'

import Mastery from '@/components/Mastery/Mastery'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const { tank_name } = await params
   const tankName = tank_name?.split('_').slice(1).join(' ')
   return {
      title: `${tankName} | Mastery Badge | World of Tanks Index`,
      description: `Vehicle details for ${tankName} Mastery badge experience needed.`,
   }
}

export default async function page({ params }: { params: Params }) {
   const { tank_id } = await params
   const mastery = (await getPoliroid(Number(tank_id), 'mastery')) as IMastery[] | undefined
   if (!mastery) return <h1>no mastery</h1>

   return <Mastery mastery={mastery} />
}

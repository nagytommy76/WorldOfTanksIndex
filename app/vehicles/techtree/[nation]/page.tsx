import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const VehiclesTable = dynamic(() => import('@/componentsVehiclesTable/VehiclesTable'))

type Props = {
   params: Promise<{ nation: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { nation } = await params
   const nationText = flagSources[nation].text
   return {
      title: `Tech tree for ${nationText} vehicles | World of Tanks Index`,
      description: `Tech tree for ${nationText} vehicles in World of Tanks game`,
   }
}

import returnVehicles from '@/lib/getVehicles'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'

export default async function page({ params }: { params: Promise<{ nation: string }> }) {
   const { nation } = await params
   const allTechTreeVehicles = await returnVehicles(nation)
   return <VehiclesTable allVehicles={allTechTreeVehicles} />
}

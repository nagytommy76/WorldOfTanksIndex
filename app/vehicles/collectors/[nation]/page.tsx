import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import returnVehicles from '@/lib/getVehicles'

const VehiclesTable = dynamic(() => import('@/componentsVehiclesTable/VehiclesTable'))

type Props = {
   params: Promise<{ nation: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { nation } = await params
   const nationText = flagSources[nation].text
   return {
      title: `Collector's vehicles for ${nationText} | World of Tanks Index`,
      description: `Collector's vehicles for ${nationText} in World of Tanks game`,
   }
}

export default async function page({ params }: { params: Promise<{ nation: string }> }) {
   const { nation } = await params
   const allCollectorsVehicles = await returnVehicles(nation, '/collectors')
   return <VehiclesTable allVehicles={allCollectorsVehicles} />
}

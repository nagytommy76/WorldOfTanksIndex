import { Metadata } from 'next'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import returnVehicles from '@/lib/getVehicles'

import Collectors from '@/TechtreeTanks/Collectors'

import FlagLinks from '@/componentsTechtree/Header/FlagLinks'

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
   return (
      <>
         <FlagLinks />
         <Collectors groupedCollectorTanksByTier={allCollectorsVehicles} />
      </>
   )
}

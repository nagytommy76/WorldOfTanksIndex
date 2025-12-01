import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for American (USA) vehicles | World of Tanks Index',
   description: 'Tech tree for American (USA) vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('usa')
   const collectorsVehicles = await returnVehicles('usa', '/collectors')
   const premiumVehicles = await returnVehicles('usa', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

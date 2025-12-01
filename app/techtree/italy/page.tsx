import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for Italy vehicles | World of Tanks Index',
   description: 'Tech tree for Italy vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('italy')
   const collectorsVehicles = await returnVehicles('italy', '/collectors')
   const premiumVehicles = await returnVehicles('italy', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

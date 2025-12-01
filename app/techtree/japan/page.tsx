import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for Japan vehicles | World of Tanks Index',
   description: 'Tech tree for Japan vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('japan')
   const collectorsVehicles = await returnVehicles('japan', '/collectors')
   const premiumVehicles = await returnVehicles('japan', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

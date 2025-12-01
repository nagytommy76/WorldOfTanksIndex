import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for Poland vehicles | World of Tanks Index',
   description: 'Tech tree for Poland vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('poland')
   const collectorsVehicles = await returnVehicles('poland', '/collectors')
   const premiumVehicles = await returnVehicles('poland', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

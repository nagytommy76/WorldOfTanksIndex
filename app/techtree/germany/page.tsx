import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for German vehicles | World of Tanks Index',
   description: 'Tech tree for German vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('germany')
   const collectorsVehicles = await returnVehicles('germany', '/collectors')
   const premiumVehicles = await returnVehicles('germany', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

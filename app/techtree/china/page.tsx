import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for China vehicles | World of Tanks Index',
   description: 'Tech tree for China vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('china')
   const collectorsVehicles = await returnVehicles('china', '/collectors')
   const premiumVehicles = await returnVehicles('china', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for French vehicles | World of Tanks Index',
   description: 'Tech tree for French vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('france')
   const collectorsVehicles = await returnVehicles('france', '/collectors')
   const premiumVehicles = await returnVehicles('france', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

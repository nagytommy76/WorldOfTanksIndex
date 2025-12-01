import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for British (U.K) vehicles | World of Tanks Index',
   description: 'Tech tree for British (U.K) vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('uk')
   const collectorsVehicles = await returnVehicles('uk', '/collectors')
   const premiumVehicles = await returnVehicles('uk', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

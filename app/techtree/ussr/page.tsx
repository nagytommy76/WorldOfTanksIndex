import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for Russian (U.S.S.R) vehicles | World of Tanks Index',
   description: 'Tech tree for Russian (U.S.S.R) vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('ussr')
   const collectorsVehicles = await returnVehicles('ussr', '/collectors')
   const premiumVehicles = await returnVehicles('ussr', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

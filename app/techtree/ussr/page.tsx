import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for Russian (U.S.S.R) vehicles | World of Tanks Index',
   description: 'Tech tree for Russian (U.S.S.R) vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getTechTreeVehicles'

import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const { groupedCollectorTanksByTier, groupedPremiumTanksByTier, groupedTanksByTier } =
      await returnVehicles('ussr')

   return (
      <TechTree
         groupedPremiumTanksByTier={groupedPremiumTanksByTier}
         groupedTanksByTier={groupedTanksByTier}
         groupedCollectorTanksByTier={groupedCollectorTanksByTier}
      />
   )
}

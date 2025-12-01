import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Tech tree for Czechoslovakia vehicles | World of Tanks Index',
   description: 'Tech tree for Czechoslovakia vehicles in World of Tanks game',
}

import returnVehicles from '@/lib/getVehicles'
import TechTree from '@/TechtreeTechTree'

export default async function page() {
   const allTechTreeVehicles = await returnVehicles('czech')
   const collectorsVehicles = await returnVehicles('czech', '/collectors')
   const premiumVehicles = await returnVehicles('czech', '/premium')

   return (
      <TechTree
         groupedPremiumTanksByTier={premiumVehicles}
         groupedTanksByTier={allTechTreeVehicles}
         groupedCollectorTanksByTier={collectorsVehicles}
      />
   )
}

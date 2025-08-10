import PremiumTanks from '@/TechtreeTanks/PremiumTanks'
import TechTreeTanks from '@/TechtreeTanks/TechTreeTanks'
import Collectors from '@/TechtreeTanks/Collectors'

import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

export default function TechTree({
   groupedPremiumTanksByTier,
   groupedTanksByTier,
   groupedCollectorTanksByTier,
}: {
   groupedTanksByTier: { [index: number]: ITechTreeVehicleType[] }
   groupedPremiumTanksByTier: { [index: number]: ITechTreeVehicleType[] }
   groupedCollectorTanksByTier: {
      [index: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <>
         <TechTreeTanks groupedTechTreeByTier={groupedTanksByTier} />
         <PremiumTanks groupedPremiumTanksByTier={groupedPremiumTanksByTier} />
         <Collectors groupedCollectorTanksByTier={groupedCollectorTanksByTier} />
      </>
   )
}

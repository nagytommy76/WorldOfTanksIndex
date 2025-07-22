import TankCard from '@/Base/TankCard/TankCard'
import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

export default function PremiumTanks({
   groupedPremiumTanksByTier,
}: {
   groupedPremiumTanksByTier: {
      [index: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <section className={'flex flex-col '}>
         {groupedPremiumTanksByTier[8].map((premiumVehicle) => (
            <TankCard key={premiumVehicle.tank_id} vehicle={premiumVehicle} />
         ))}
      </section>
   )
}

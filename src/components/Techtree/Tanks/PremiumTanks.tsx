import TankCard from '@/Base/TankCard/TankCard'

import type { TechTreeVehiclesType } from '@/types/VehicleDetails/Vehicle'

export default function PremiumTanks({
   groupedPremiumTanksByTier,
}: {
   groupedPremiumTanksByTier: TechTreeVehiclesType[]
}) {
   return (
      <section className={'w-full flex flex-col justify-center my-5'}>
         <div className='w-full flex flex-row flex-wrap justify-center gap-5'>
            {groupedPremiumTanksByTier.map((premiumVehicle) => (
               <div key={premiumVehicle.id} className='my-6'>
                  <TankCard key={premiumVehicle.id} vehicle={premiumVehicle} />
               </div>
            ))}
         </div>
      </section>
   )
}

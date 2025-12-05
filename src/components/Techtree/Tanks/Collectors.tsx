import TankCard from '@/Base/TankCard/TankCard'

import type { TechTreeVehiclesType } from '@/types/VehicleDetails/Vehicle'

export default function Collectors({
   groupedCollectorTanksByTier,
}: {
   groupedCollectorTanksByTier: TechTreeVehiclesType[]
}) {
   return (
      <section className={'w-full flex flex-col justify-center my-5'}>
         <div className='w-full flex flex-row flex-wrap justify-center gap-5'>
            {groupedCollectorTanksByTier.map((collectorVehicle) => (
               <div key={collectorVehicle.id} className='my-6'>
                  <TankCard key={collectorVehicle.id} vehicle={collectorVehicle} />
               </div>
            ))}
         </div>
      </section>
   )
}

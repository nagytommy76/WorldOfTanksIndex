import TankCard from '@/Base/TankCard/TankCard'

import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

export default function TechTreeTanks({
   groupedTechTreeByTier,
}: {
   groupedTechTreeByTier: {
      [index: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <section className={'w-full flex flex-col justify-center'}>
         <div className='w-full flex flex-row flex-wrap justify-center gap-5'>
            {Object.keys(groupedTechTreeByTier).map((key) => (
               <div key={key}>
                  {groupedTechTreeByTier[Number(key)].map((techTreeVehicle) => (
                     <span key={techTreeVehicle.tank_id}>
                        {!techTreeVehicle.name.endsWith('FL') && (
                           <TankCard key={techTreeVehicle.tank_id} vehicle={techTreeVehicle} />
                        )}
                     </span>
                  ))}
               </div>
            ))}
         </div>
      </section>
   )
}

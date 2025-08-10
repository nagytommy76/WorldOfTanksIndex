import TierList from '@/componentsTechtree/Header/TierList'
import TankCard from '@/Base/TankCard/TankCard'

import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

import Typography from '@mui/material/Typography'

export default function Collectors({
   groupedCollectorTanksByTier,
}: {
   groupedCollectorTanksByTier: {
      [index: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <section className={'w-full flex flex-col justify-center'}>
         <Typography variant='h6' className={'my-8 text-center text-amber-200 '}>
            Collector&apos;s vehicles
         </Typography>
         <TierList />
         <div className='w-full flex flex-row flex-wrap justify-center gap-5'>
            {Object.keys(groupedCollectorTanksByTier).map((key) => (
               <div key={key}>
                  {groupedCollectorTanksByTier[Number(key)].map((collectorVehicle) => (
                     <div key={collectorVehicle.tank_id} className='my-6'>
                        {!collectorVehicle.name.endsWith('FL') && (
                           <TankCard key={collectorVehicle.tank_id} vehicle={collectorVehicle} />
                        )}
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </section>
   )
}

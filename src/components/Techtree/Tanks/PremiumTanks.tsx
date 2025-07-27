import TankCard from '@/Base/TankCard/TankCard'

import Typography from '@mui/material/Typography'
import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

export default function PremiumTanks({
   groupedPremiumTanksByTier,
}: {
   groupedPremiumTanksByTier: {
      [tier: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <section className={'w-full flex flex-col justify-center'}>
         <Typography variant='h6' className={'my-8 text-center text-amber-200 '}>
            Premium vehicles
         </Typography>
         <div className='w-full flex flex-row flex-wrap justify-center gap-5'>
            {Object.keys(groupedPremiumTanksByTier).map((key) => (
               <div key={key}>
                  {groupedPremiumTanksByTier[Number(key)].map((premiumVehicle) => (
                     <div key={premiumVehicle.tank_id} className='my-6'>
                        {!premiumVehicle.name.endsWith('FL') && (
                           <TankCard key={premiumVehicle.tank_id} vehicle={premiumVehicle} />
                        )}
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </section>
   )
}

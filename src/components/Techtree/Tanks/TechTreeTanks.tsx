import Image from 'next/image'
import Link from 'next/link'
import TankCard from '@/Base/TankCard/TankCard'

import getIcon from '@/lib/getVehicleTypeIcon'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

const tier = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default function TechTreeTanks({
   groupedTechTreeByTier,
}: {
   groupedTechTreeByTier: {
      [tier: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <section>
         {/* <div>
            <div>
               <div>Nation</div>
               <div>Type</div>
               <div>Vehicle name</div>
            </div>
         </div> */}
         {Object.keys(groupedTechTreeByTier).map((key) => (
            <>
               {groupedTechTreeByTier[Number(key)].map((techTreeVehicle) => (
                  <Link
                     className='w-full flex flex-row justify-start items-center gap-6 
                     border-b-1 border-neutral-600 py-2 transition-all hover:bg-neutral-800'
                     href={`/${techTreeVehicle.tank_id}/${techTreeVehicle.name}`}
                     key={techTreeVehicle.tank_id}
                  >
                     <Image
                        src={flagSources[techTreeVehicle.nation].source}
                        alt={flagSources[techTreeVehicle.nation].alt}
                        width={30}
                        height={30}
                        className='object-cover w-[35px]'
                     />
                     <Image
                        src={getIcon(techTreeVehicle.type)}
                        alt={techTreeVehicle.name}
                        width={15}
                        height={15}
                        className=''
                     />
                     <Typography textAlign={'center'}>{tier[Number(techTreeVehicle.tier - 1)]}</Typography>
                     <div className={'flex flex-row items-center justify-center'}>
                        <Image
                           src={techTreeVehicle.images.contour_icon}
                           width={65}
                           height={65}
                           alt={techTreeVehicle.name}
                        />
                        <Typography>{techTreeVehicle.name}</Typography>
                     </div>
                     <Typography>{techTreeVehicle.price_credit}</Typography>
                  </Link>
               ))}
            </>
         ))}
      </section>
   )
   return (
      <section className={'grid grid-cols-3 grid-rows-4 gap-1'}>
         {/* <div> */}
         {Object.keys(groupedTechTreeByTier).map((key) => (
            <Paper key={key} className='my-4 w-125 h-125 grid col-span-2'>
               {groupedTechTreeByTier[Number(key)].map((techTreeVehicle) => (
                  <TankCard key={techTreeVehicle.tank_id} vehicle={techTreeVehicle} />
               ))}
            </Paper>
         ))}
         {/* </div> */}
      </section>
   )
}

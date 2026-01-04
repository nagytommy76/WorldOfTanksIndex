import type { RequestData } from '../Types'
import Image from 'next/image'
import Link from 'next/link'

import getIcon from '@/lib/getVehicleTypeIcon'
import tiers from '@/lib/tierList'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'

import Typography from '@mui/material/Typography'

function ColoredTypography({
   text,
   isGift,
   isPremium,
}: {
   text: string
   isPremium: boolean
   isGift: boolean
}) {
   return (
      <Typography className={`${isPremium || isGift ? 'text-amber-400' : ''}`} variant='body1'>
         {text}
      </Typography>
   )
}

export default function VehicleElements({
   foundTanks,
   handleClose,
}: {
   foundTanks: RequestData[]
   handleClose: () => void
}) {
   return (
      <section className='w-full max-h-[450px] overflow-auto py-2 flex flex-col gap-1'>
         {foundTanks.map((tank) => {
            if (tank.id === null && !tank.tankDetails) return
            return (
               <Link
                  onClick={handleClose}
                  key={tank.name}
                  href={`/${tank.id}/${tank.xmlId}/modules`}
                  className='w-full p-2 flex flex-row justify-between items-center transition-all duration-75 hover:bg-neutral-700'
               >
                  <div className='flex flex-row items-center gap-2'>
                     <Image
                        alt={tank.name}
                        src={tank.tankDetails?.images.big_icon || ''}
                        width={75}
                        height={75}
                     />
                     <Image alt={tank.name} src={getIcon(tank.type) || ''} width={15} height={15} />
                     <ColoredTypography
                        isGift={tank.tankDetails?.is_gift || false}
                        isPremium={tank.tankDetails?.is_premium || false}
                        text={tiers[tank.tier - 1]}
                     />
                     <ColoredTypography
                        isGift={tank.tankDetails?.is_gift || false}
                        isPremium={tank.tankDetails?.is_premium || false}
                        text={tank.tankDetails?.name || tank.name}
                     />
                  </div>
                  <Image
                     alt={flagSources[tank.nation].alt}
                     src={flagSources[tank.nation].source || ''}
                     width={45}
                     height={45}
                  />
               </Link>
            )
         })}
      </section>
   )
}

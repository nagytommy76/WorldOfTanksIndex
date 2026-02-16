'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { flagSources } from '@/Base/FlagLinks/FlagLinks'

export default function FlagLinks({
   vehicleTypeProp = null,
   flagSize = 70,
   opacity = 50,
}: {
   vehicleTypeProp?: string | null
   flagSize?: number
   opacity?: number
}) {
   const pathname = usePathname()
   const vehicleType = pathname && pathname.split('/')[2]
   const isVehicleTypeInPath = vehicleType === undefined ? vehicleTypeProp : vehicleType

   return (
      <section
         className={
            'grid grid-cols-3 gap-2 justify-items-center xl:flex xl:flex-row xl:justify-center xl:gap-5'
         }
      >
         {Object.keys(flagSources).map((key) => {
            const isActive = pathname === `/vehicles/${isVehicleTypeInPath}/${key}`
            return (
               <Link
                  className={
                     `hover:opacity-100 transition-all duration-150` +
                     (isActive ? `` : ` opacity-${opacity} `)
                  }
                  href={`/vehicles/${vehicleType === undefined ? vehicleTypeProp : vehicleType}/${key}`}
                  key={key}
               >
                  <Image
                     src={flagSources[key].source}
                     alt={flagSources[key].alt}
                     title={flagSources[key].alt}
                     width={flagSize}
                     height={flagSize}
                  />
               </Link>
            )
         })}
      </section>
   )
}

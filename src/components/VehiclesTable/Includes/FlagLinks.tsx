'use client'
import { useState } from 'react'
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
   const nation = pathname.split('/')[3]

   return (
      <section
         className={
            'grid grid-cols-3 gap-2 justify-items-center xl:flex xl:flex-row xl:justify-center xl:gap-5'
         }
      >
         {Object.keys(flagSources).map((key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isHover, setIsHover] = useState<boolean>(false)
            const isActive = key === nation

            return (
               <Link
                  style={{
                     opacity: isActive || isHover ? 1 : opacity / 100,
                     transition: 'opacity 0.15s',
                     transitionDuration: '150ms',
                  }}
                  href={`/vehicles/${vehicleType === undefined ? vehicleTypeProp : vehicleType}/${key}`}
                  key={key}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
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

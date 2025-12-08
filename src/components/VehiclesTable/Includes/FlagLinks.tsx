'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { flagSources } from '@/Base/FlagLinks/FlagLinks'

export default function FlagLinks() {
   const pathname = usePathname()
   const vehicleType = pathname && pathname.split('/')[2]
   return (
      <section className={'flex flex-row justify-center gap-5'}>
         {Object.keys(flagSources).map((key) => {
            return (
               <Link
                  className={
                     pathname === `/vehicles/${vehicleType}/${key}`
                        ? 'opacity-100'
                        : 'opacity-50 hover:opacity-100'
                  }
                  href={`/vehicles/${vehicleType}/${key}`}
                  key={key}
               >
                  <Image
                     src={flagSources[key].source}
                     alt={flagSources[key].alt}
                     title={flagSources[key].alt}
                     width={70}
                     height={70}
                  />
               </Link>
            )
         })}
      </section>
   )
}

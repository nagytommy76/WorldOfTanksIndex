'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function PlaceholderImg({ tank_name }: { tank_name: string }) {
   const [imageError, setImageError] = useState(false)
   return (
      <Image
         className='absolute bottom-0 lg:top-0 left-0 -z-9'
         src={
            imageError
               ? '/placeholder-vehicle.png'
               : `https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${tank_name.toLocaleLowerCase()}/${tank_name.toLocaleLowerCase()}_image.png`
         }
         alt={tank_name}
         title={tank_name}
         width={1920}
         height={900}
         onError={() => setImageError(true)}
      />
   )
}

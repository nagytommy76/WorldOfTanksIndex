'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import mechanicUrls from '@/helpers/mechanicVideoUrls'

import YouTubeIcon from '@mui/icons-material/YouTube'
import Typography from '@mui/material/Typography'

export default function PlaceholderImg({ tank_name }: { tank_name: string }) {
   const [imageError, setImageError] = useState(false)
   return (
      <>
         <Image
            className='absolute bottom-0 lg:top-0 left-0 -z-1 xl:max-w-[118vw]'
            src={
               imageError
                  ? '/placeholder-vehicle.png'
                  : `https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${tank_name.toLocaleLowerCase()}/${tank_name.toLocaleLowerCase()}_image.png`
            }
            alt={tank_name}
            title={tank_name}
            sizes='100vw'
            width={1920}
            height={900}
            onError={() => setImageError(true)}
         />
         {mechanicUrls[tank_name] && (
            <div className='absolute bottom-2 left-3 flex flex-col items-center justify-center'>
               <Link target='_blank' href={mechanicUrls[tank_name]} className='cursor-pointer'>
                  <YouTubeIcon
                     className='transition-all hover:translate-y-2 hover:text-red-700'
                     sx={{ fontSize: 70 }}
                  />
               </Link>
               <Typography variant='caption' className='uppercase'>
                  View Mechanic
               </Typography>
            </div>
         )}
      </>
   )
}

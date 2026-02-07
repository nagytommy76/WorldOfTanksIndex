'use client'

import Skeleton from '@mui/material/Skeleton'

export default function loading() {
   return (
      <section
         className={`
               flex w-full min-h-screen flex-col gap-0 xl:flex-row xl:gap-5 
               xl:justify-between bg-neutral-900 rounded-lg xl:p-6
               `}
      >
         <Skeleton variant='rectangular' width={'30%'} height={1000} className='rounded-lg' />
         <Skeleton variant='rectangular' width={'100%'} height={1000} className='rounded-lg' />
      </section>
   )
}

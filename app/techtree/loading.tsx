'use client'

import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

export default function loading() {
   return (
      <section className='w-3xl mx-auto my-11'>
         <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
            <Skeleton animation='wave' variant='rounded' width={'100%'} height={40} />
         </Stack>
      </section>
   )
}

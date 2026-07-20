import React from 'react'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default async function NotFound() {
   return (
      <div className='w-full min-h-screen flex justify-center'>
         <div className='flex flex-col justify-center'>
            <Typography variant='h2' align='left' fontWeight={600} color='primary'>
               Sorry Commander!
            </Typography>{' '}
            <Typography variant='h2'>100% camouflage rating</Typography>
            <Typography variant='h5'>
               This page is so well hidden even our own scouts couldn&apos;t spot it. impressive, honestly.
            </Typography>
            <Link href={'/'} className='mt-3'>
               <Button
                  sx={{
                     textTransform: 'none',
                     fontSize: '1rem',
                  }}
                  variant='outlined'
               >
                  Use bond binoculars! (Back to garage)
               </Button>
            </Link>
         </div>
      </div>
   )
}

'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import Paper from '@mui/material/Paper'

export default function ErrorPage({
   error,
   unstable_retry,
}: {
   error: Error & { digest?: string }
   unstable_retry: () => void
}) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
   }, [error])

   return (
      <div className='max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center'>
         <Paper className='p-6' elevation={3}>
            <Typography variant='h2' align='left' fontWeight={600}>
               Sorry Commander!
            </Typography>
            <Typography variant='h2' color='error'>
               Something went wrong!
            </Typography>
            <Typography gutterBottom>{error.name}</Typography>
            <Typography gutterBottom>{error.message}</Typography>
            <Typography gutterBottom>{error.stack}</Typography>
            <div className='flex flex-col max-w-70'>
               <Button
                  color='error'
                  variant='outlined'
                  onClick={
                     // Attempt to recover by re-fetching and re-rendering the segment
                     () => unstable_retry()
                  }
               >
                  Try again
               </Button>
               <Link href={'/'} className='mt-3'>
                  <Button
                     sx={{
                        textTransform: 'none',
                        fontSize: '1rem',
                     }}
                     variant='outlined'
                  >
                     Go back to the main page
                  </Button>
               </Link>
            </div>
         </Paper>
      </div>
   )
}

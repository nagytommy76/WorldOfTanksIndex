import Image from 'next/image'
import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function AboutHero() {
   return (
      <header className='w-full h-[450px] relative'>
         <Image
            src='/WOT_index.jpg'
            alt='World of Tanks Index'
            width={900}
            height={500}
            sizes='100vw'
            className='-z-1 w-full h-full object-cover object-[50%_100%]'
         />
         <div className='w-full h-full absolute top-0 bg-[rgba(0,0,0,0.65)]' />
         <section className='w-full h-full absolute top-0 flex flex-col items-center justify-center gap-6 px-4'>
            <Typography
               variant='h1'
               component='h1'
               textAlign='center'
               className='text-3xl font-semibold xl:text-5xl'
            >
               About the <span className='text-amber-600'>World of Tanks Index</span>
            </Typography>
            <Typography variant='h6' component='p' textAlign='center' className='max-w-3xl font-normal'>
               Every vehicle’s real stats, straight from the game files. Configure modules, equipment and
               crew, and check Marks of Excellence and Mastery Badge requirements, all in one place.
            </Typography>
            <div className='flex flex-wrap justify-center gap-4'>
               <Link href={'/vehicles/techtree/germany'}>
                  <Button variant='contained' size='large'>
                     Browse Tech Tree
                  </Button>
               </Link>
               <Link href={'/vehicles/premium/germany'}>
                  <Button variant='outlined' size='large'>
                     Explore Premium
                  </Button>
               </Link>
            </div>
         </section>
      </header>
   )
}

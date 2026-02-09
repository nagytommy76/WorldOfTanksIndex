import Image from 'next/image'
import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import SearchBar from '@/src/components/Navbar/Search/SearchBar'

export default function HeaderSection() {
   return (
      <header className='w-full h-[600px] relative'>
         <Image
            src='/WOT_index.jpg'
            alt='Wot index'
            width={900}
            height={500}
            sizes='100vw'
            className='-z-1 w-full h-full object-cover object-[50%_100%] '
         />
         <div className='w-full h-full absolute top-0 bg-[rgba(0,0,0,0.55)]' />
         <section className='w-full h-full absolute top-0 flex flex-col items-center justify-center gap-10'>
            <Typography variant='h2' textAlign='center' className='mx-2 text-4xl font-semibold xl:text-6xl'>
               Welcome to the <span className='text-amber-600'>World of Tanks Index </span>
               page!
            </Typography>
            <SearchBar searchText='Search for vehicles:  Leopard 1, EBR 105, T110E5' />
            <Typography variant='body2' textAlign='center' className=''>
               Search for World of Tanks vehicles, stats, Marks of Excellence values and Gunmark requirements!
            </Typography>
            <Link href={'/#popularTanks'}>
               <Button variant='outlined' color='success' size='large' endIcon={<ArrowDownwardIcon />}>
                  Explore Popular Tanks!
               </Button>
            </Link>
         </section>
      </header>
   )
}

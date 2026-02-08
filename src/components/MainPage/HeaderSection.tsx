import Image from 'next/image'
import Typography from '@mui/material/Typography'
import SearchBar from '@/src/components/Navbar/Search/SearchBar'

export default function HeaderSection() {
   return (
      <header className='w-full h-[600px] relative '>
         <Image
            src='/WOT_index.jpg'
            alt='Wot index'
            width={900}
            height={500}
            sizes='100vw'
            className='-z-1 w-full h-full object-cover object-[50%_100%] '
         />
         <div className='w-full h-full absolute top-0 bg-[rgba(0,0,0,0.55)]' />
         <section className='w-full h-full absolute top-0 flex flex-col items-center justify-center'>
            <Typography
               variant='h2'
               textAlign='center'
               className='py-10 mx-2 text-4xl font-semibold xl:text-6xl'
            >
               Welcome to the <span className='text-amber-600'>World of Tanks Index </span>
               page!
            </Typography>
            <SearchBar />

            <Typography variant='body2' textAlign='center' className='mt-10'>
               Search for World of Tanks vehicles, stats, Marks of Excellence values and Gunmark requirements!
            </Typography>
         </section>
      </header>
   )
}

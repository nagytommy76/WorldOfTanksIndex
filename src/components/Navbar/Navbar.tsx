import Link from 'next/link'
import Image from 'next/image'

import SearchBar from './Search/SearchBar'
import DropdownMenu from './Menu/DropdownMenu'

export default function Navbar() {
   return (
      <header
         className={'w-full h-16 sticky top-0 bg-neutral-950/50 transition-colors  hover:bg-neutral-950 z-10'}
      >
         <nav className='h-full px-5 max-w-screen-2xl mx-auto flex justify-between items-center '>
            <Link href={'/'} className={'text-2xl hover:text-amber-400'}>
               <Image
                  src={'/world_of_tanks_logo.svg'}
                  alt={'WoT Index Logo'}
                  width={120}
                  height={120}
                  style={{
                     filter:
                        'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2%) hue-rotate(318deg) brightness(109%) contrast(101%)',
                  }}
               />
            </Link>
            <section className={'flex flex-row gap-3'}>
               <DropdownMenu />
            </section>
            <SearchBar />
         </nav>
      </header>
   )
}

import Link from 'next/link'

import SearchBar from './includes/SearchBar'

export default function Navbar() {
   return (
      <header
         className={'w-full h-16 mb-3 sticky top-0 bg-neutral-950/50 transition-colors  hover:bg-neutral-950'}
      >
         <nav className='h-full px-3 max-w-screen-2xl mx-auto flex justify-between items-center '>
            <Link href={'/'} className={'text-2xl hover:text-amber-400'}>
               WoT Index
            </Link>
            <section className={'flex flex-row gap-3'}>
               <h1>Tech three</h1>
               <h1>Tech three</h1>
               <h1>Tech three</h1>
            </section>
            <SearchBar />
         </nav>
      </header>
   )
}

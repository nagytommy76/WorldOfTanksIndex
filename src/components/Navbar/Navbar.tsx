'use client'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import SearchBar from './Search/SearchBar'
import DropdownMenu from './Menu/DropdownMenu'

function NavbarLogoLink() {
   return (
      <Link href={'/'} className={''}>
         <Image
            src={'/world_of_tanks_logo.svg'}
            alt={'WoT Index Logo'}
            width={120}
            height={120}
            className={`filter-white`}
         />
      </Link>
   )
}

export default function Navbar() {
   const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
   return (
      <header
         className={`
         w-full sticky top-0 bg-neutral-950/50 transition-all hover:bg-neutral-950 z-10
         ${isNavOpen ? 'h-screen' : 'h-18'}
      `}
      >
         <nav
            className={`
               px-5 max-w-screen-2xl h-full mx-auto flex justify-between items-center
               
            `}
         >
            <NavbarLogoLink />
            {/* Desktop NavBar */}
            <section className='hidden md:flex flex-row gap-3 w-full '>
               <DropdownMenu />
               <SearchBar />
            </section>

            {/* Hamburger Button (mobile only) */}
            <button
               className='md:hidden flex flex-col justify-center items-center gap-1.5 p-2'
               onClick={() => setIsNavOpen((prev) => !prev)}
               aria-label='Toggle menu'
            >
               <span
                  className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isNavOpen ? 'translate-y-2 rotate-45' : ''}`}
               />
               <span
                  className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${isNavOpen ? 'opacity-0' : ''}`}
               />
               <span
                  className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isNavOpen ? '-translate-y-2 -rotate-45' : ''}`}
               />
            </button>
         </nav>
         {/* Mobile Dropdown Panel */}
         {/* <div
            className={`md:hidden overflow-hidden transition-all duration-300 bg-neutral-950 
               
               ${isNavOpen ? 'h-screen py-4' : 'h-0'}
               `}
         >
            <div className='flex flex-col gap-4 px-5'>
               <DropdownMenu />
               <SearchBar />
            </div>
         </div> */}
      </header>
   )
}

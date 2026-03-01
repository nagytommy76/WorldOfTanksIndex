'use client'
import useNavbar from './Hooks/useNavbar'

import SearchBar from './Search/SearchBar'
import DropdownMenu from './Menu/DropdownMenu'

import HamburgerBtn from './Includes/HamburgerBtn'
import NavbarLogoLink from './Includes/NavbarLogoLink'
import LinkElement from './Includes/LinkElement'

export default function Navbar() {
   const { closeNav, isNavOpen, toggleIsNavOpen } = useNavbar()

   return (
      <header
         className={`
         h-18 w-full sticky top-0  transition-all hover:bg-neutral-950 z-10 xl:bg-neutral-950/50
         ${isNavOpen ? 'bg-neutral-950' : 'bg-neutral-950/50'}
      `}
      >
         <nav
            className={`
               px-5 max-w-[1650px] h-full mx-auto flex justify-between items-center
            `}
         >
            <section className='xl:hidden'>
               <NavbarLogoLink />
            </section>
            {/* Desktop Nav */}
            <section className='hidden md:flex flex-row order-2 gap-3 items-center justify-between w-full'>
               <NavbarLogoLink />
               <div className='flex flex-row items-center gap-4'>
                  <DropdownMenu />
                  <LinkElement href='/about' text='About' />
               </div>
               <SearchBar />
            </section>

            {/* Hamburger Button (mobile only) */}
            <HamburgerBtn isNavOpen={isNavOpen} toggleIsNavOpen={toggleIsNavOpen} />
         </nav>

         <section
            className={`md:hidden overflow-hidden h-[calc(100vh-72px)] py-5 transition-all duration-200 bg-neutral-950
                ${isNavOpen ? '-translate-x-0' : '-translate-x-120'}
              flex flex-col gap-4 items-center justify-between
               `}
         >
            <div className='flex flex-col items-center gap-4'>
               <DropdownMenu onClose={closeNav} />
               <LinkElement href='/about' text='About' onClose={closeNav} />
            </div>
            <SearchBar />
         </section>
      </header>
   )
}

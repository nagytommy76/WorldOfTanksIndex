import Button from '@mui/material/Button'

export default function HamburgerBtn({
   isNavOpen,
   toggleIsNavOpen,
}: {
   isNavOpen: boolean
   toggleIsNavOpen: () => void
}) {
   return (
      <Button
         className='md:hidden flex flex-col justify-center items-center gap-1.5 p-2'
         onClick={toggleIsNavOpen}
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
      </Button>
   )
}

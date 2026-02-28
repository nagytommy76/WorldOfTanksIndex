import { useState } from 'react'

export default function useNavbar() {
   const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

   function toggleIsNavOpen() {
      setIsNavOpen((prev) => !prev)
   }

   function closeNav() {
      setIsNavOpen(false)
   }

   return {
      isNavOpen,
      toggleIsNavOpen,
      closeNav,
   }
}

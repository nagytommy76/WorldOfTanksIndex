import Link from 'next/link'
import Image from 'next/image'

export default function NavbarLogoLink() {
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

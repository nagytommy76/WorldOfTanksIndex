import Link from 'next/link'

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function LinkComponent({ href, children }: { href: string; children: React.ReactNode }) {
   return (
      <Link target='_blank' className='hover:underline' href={href}>
         {children}
      </Link>
   )
}

export default function Footer() {
   return (
      <footer className='w-full h-36 flex flex-col justify-center items-center gap-1 opacity-50'>
         <h1>
            Made by Thomas Nagy{' '}
            <LinkComponent href={'https://tomato.gg/stats/nagytommy93-511400957/EU?tab=main'}>
               ( nagytommy93 )
            </LinkComponent>
         </h1>
         <div>
            <LinkComponent href={'https://github.com/nagytommy76'}>
               <GitHubIcon fontSize='large' />
            </LinkComponent>
            <LinkComponent href={'https://www.linkedin.com/in/tamasnagy93/'}>
               <LinkedInIcon fontSize='large' />
            </LinkComponent>
         </div>
         <small>
            This application is not endorsed by
            <LinkComponent href='https://www.wargaming.net/en'> Wargaming.net </LinkComponent>
            in any way.
         </small>
         <small>
            The page is inspired by{' '}
            <LinkComponent href={'https://skill4ltu.eu/'}>skill4ltu&apos;s</LinkComponent> index page.
         </small>
         <small>
            World of Tanks, Wargaming.net, and all associated properties are trademarks or registered
            trademarks of their respective owners.
         </small>
      </footer>
   )
}

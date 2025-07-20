import Link from 'next/link'

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Footer() {
   return (
      <footer className='w-full h-36 flex flex-col justify-center items-center gap-1 opacity-50'>
         <h1>Made by Thomas Nagy ( nagytommy93 )</h1>
         <div>
            <Link href={'https://github.com/nagytommy76'} target='_blank'>
               <GitHubIcon fontSize='large' />
            </Link>
            <Link href={'https://www.linkedin.com/in/tamasnagy93/'} target='_blank'>
               <LinkedInIcon fontSize='large' />
            </Link>
         </div>
         <small>
            This application is not endorsed by
            <a className='hover:underline' href='https://www.wargaming.net/en' target='_blank'>
               {' '}
               Wargaming.net{' '}
            </a>
            in any way.
         </small>
         <small>
            The page is inspired by{' '}
            <Link className='hover:underline' href={'https://skill4ltu.eu/'} target='_blank'>
               skill4ltu&apos;s
            </Link>{' '}
            index page.
         </small>
         <small>
            World of Tanks, Wargaming.net, and all associated properties are trademarks or registered
            trademarks of their respective owners.
         </small>
      </footer>
   )
}

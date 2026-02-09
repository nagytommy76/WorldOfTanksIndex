import Link from 'next/link'

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Typography from '@mui/material/Typography'

import FlagLinks from '@/componentsVehiclesTable/Includes/FlagLinks'

function LinkComponent({ href, children }: { href: string; children: React.ReactNode }) {
   return (
      <Link target='_blank' className='hover:underline' href={href}>
         {children}
      </Link>
   )
}

export default function Footer() {
   return (
      <footer className='w-full min-h-[250px] text-center flex flex-col justify-between items-center gap-3 mt-15 py-8 bg-neutral-950'>
         <div className='mb-5'>
            <Typography variant='body2' className='pb-4'>
               Explore Tech Tree Vehicles
            </Typography>
            <FlagLinks flagSize={50} vehicleTypeProp={'techtree'} />
         </div>
         <Typography variant='body1'>
            Made by Tamás Nagy <br />
            <LinkComponent href={'https://tomato.gg/stats/nagytommy93-511400957/EU?tab=main'}>
               nagytommy93
            </LinkComponent>
            <br />
            <LinkComponent href={'https://www.nagytamas93.hu/'}>https://www.nagytamas93.hu/</LinkComponent>
         </Typography>
         <div>
            <LinkComponent href={'https://github.com/nagytommy76'}>
               <GitHubIcon fontSize='large' />
            </LinkComponent>
            <LinkComponent href={'https://www.linkedin.com/in/tamasnagy93/'}>
               <LinkedInIcon fontSize='large' />
            </LinkComponent>
         </div>
         <small className=''>
            I made this project for fun, to practice my Next.js skills and to create a useful tool for the
            World of Tanks community.
            <br />
            This application is not endorsed by
            <LinkComponent href='https://www.wargaming.net/en'> Wargaming.net </LinkComponent>
            in any way.
            <br />
            World of Tanks, Wargaming.net, and all associated properties are trademarks or registered
            trademarks of their respective owners.
         </small>
      </footer>
   )
}

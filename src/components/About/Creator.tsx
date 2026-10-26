import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LanguageIcon from '@mui/icons-material/Language'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

import SectionTitle from './Includes/SectionTitle'

const CREATOR_LINKS = [
   {
      text: 'Tomato.gg',
      href: 'https://tomato.gg/stats/nagytommy93-511400957/EU?tab=main',
      icon: <MilitaryTechIcon />,
   },
   { text: 'GitHub', href: 'https://github.com/nagytommy76', icon: <GitHubIcon /> },
   { text: 'LinkedIn', href: 'https://www.linkedin.com/in/tamasnagy93/', icon: <LinkedInIcon /> },
   { text: 'Website', href: 'https://www.nagytamas93.hu/', icon: <LanguageIcon /> },
]

export default function Creator() {
   return (
      <section>
         <SectionTitle title='About the creator' />
         <Card variant='outlined' className='max-w-4xl mx-auto'>
            <CardContent className='flex flex-col md:flex-row items-center gap-6 p-6'>
               <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: 36 }}>TN</Avatar>
               <div className='flex flex-col gap-3'>
                  <Typography variant='h6' component='h3'>
                     Tamás Nagy <span className='text-amber-500'>(nagytommy93)</span>
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                     I’ve been playing World of Tanks since 2013, with more than 25 000 random battles and many ESL,
                     Stronghold and Onslaught games. This project is built from long-term, hands-on experience with
                     the game: how vehicle statistics translate into real performance on the battlefield, from gun
                     handling and shell velocity to view range and camo values.
                  </Typography>
                  <div className='flex flex-wrap gap-2'>
                     {CREATOR_LINKS.map(({ text, href, icon }) => (
                        <Link key={text} href={href} target='_blank'>
                           <Button variant='outlined' size='small' startIcon={icon}>
                              {text}
                           </Button>
                        </Link>
                     ))}
                  </div>
               </div>
            </CardContent>
         </Card>
      </section>
   )
}

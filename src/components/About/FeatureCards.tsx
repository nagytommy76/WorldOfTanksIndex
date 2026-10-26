import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import SectionTitle from './Includes/SectionTitle'
import { FEATURES } from './Data/features'

export default function FeatureCards() {
   return (
      <section>
         <SectionTitle title='What you can do' subtitle='Everything you need to know about a vehicle before you drive it.' />
         <Grid container spacing={3}>
            {FEATURES.map(({ title, description, icon: Icon, href }) => (
               <Grid key={title} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Card variant='outlined' className='h-full'>
                     <CardContent className='flex flex-col gap-3'>
                        <Icon color='primary' fontSize='large' />
                        <Typography variant='h6' component='h3'>
                           {href ? (
                              <Link href={href} className='hover:text-amber-400 transition-colors duration-150'>
                                 {title}
                              </Link>
                           ) : (
                              title
                           )}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                           {description}
                        </Typography>
                     </CardContent>
                  </Card>
               </Grid>
            ))}
         </Grid>
      </section>
   )
}

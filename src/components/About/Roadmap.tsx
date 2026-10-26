import type { RoadmapStatus } from '@/types/About/aboutTypes'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import SectionTitle from './Includes/SectionTitle'
import { ROADMAP_ITEMS } from './Data/roadmap'

const STATUS_CHIPS: Record<RoadmapStatus, { label: string; color: 'default' | 'primary' | 'success' }> = {
   planned: { label: 'Planned', color: 'default' },
   'in-progress': { label: 'In progress', color: 'primary' },
   done: { label: 'Done', color: 'success' },
}

export default function Roadmap() {
   if (ROADMAP_ITEMS.length === 0) return null
   return (
      <section>
         <SectionTitle title='Future plans' subtitle='Features and improvements coming to the World of Tanks Index.' />
         <Grid container spacing={3}>
            {ROADMAP_ITEMS.map(({ title, description, status }) => (
               <Grid key={title} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Card variant='outlined' className='h-full'>
                     <CardContent className='flex flex-col gap-3'>
                        <div className='flex justify-between items-start gap-2'>
                           <Typography variant='h6' component='h3'>
                              {title}
                           </Typography>
                           <Chip
                              size='small'
                              label={STATUS_CHIPS[status].label}
                              color={STATUS_CHIPS[status].color}
                           />
                        </div>
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

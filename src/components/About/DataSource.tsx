import Link from 'next/link'

import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import StorageIcon from '@mui/icons-material/Storage'

import SectionTitle from './Includes/SectionTitle'

export default function DataSource() {
   return (
      <section>
         <SectionTitle title='Where the data comes from' />
         <Paper variant='outlined' className='max-w-4xl mx-auto p-6 flex flex-col gap-4'>
            <div className='flex gap-4 items-start'>
               <StorageIcon color='primary' fontSize='large' />
               <Typography variant='body1'>
                  Vehicle characteristics are extracted directly from the World of Tanks game client’s own vehicle
                  definition files, converted into structured data and stored in a database. This means the values
                  reflect the original in-game configuration instead of being copied from third-party sources.
               </Typography>
            </div>
            <Typography variant='body1'>
               Marks of Excellence and Mastery Badge requirements are provided by{' '}
               <Link href='https://poliroid.me' target='_blank' className='text-amber-500 hover:underline'>
                  poliroid.me
               </Link>
               .
            </Typography>
            <Alert severity='info' variant='outlined'>
               Stats match the current game client version. Crew-affected values are calculated with the in-game
               formulas, so small rounding differences compared to other sites are possible.
            </Alert>
         </Paper>
      </section>
   )
}

import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

import Firepower from './Firepower/Firepower'
import Mobility from './Mobility/Mobility'
import Survivability from './Survivability/Survivability'
import Other from './Other/Other'

export default function DetailsTable() {
   return (
      <section className='w-full'>
         <Typography gutterBottom variant='h5'>
            Tank specifications
         </Typography>
         <TableContainer
            component={Paper}
            className='min-h-screen grid grid-cols-1 grid-rows-1 gap-4 xl:grid-cols-2 xl:grid-rows-2'
         >
            <Firepower />
            <Mobility />
            <Survivability />
            <Other />
         </TableContainer>
      </section>
   )
}

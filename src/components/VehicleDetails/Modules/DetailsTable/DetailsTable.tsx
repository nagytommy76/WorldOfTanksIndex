import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import Firepower from './Firepower/Firepower'
import Mobility from './Mobility/Mobility'
import Survivability from './Survivability/Survivability'
import Other from './Other/Other'
import Concealment from './Concealment/Concealment'
import Spotting from './Spotting/Spotting'

export default function DetailsTable() {
   return (
      <section className='w-full'>
         <Typography gutterBottom variant='h5'>
            Tank specifications
         </Typography>
         <TableContainer
            className='min-h-screen grid grid-cols-1 grid-rows-1 xl:gap-x-5 xl:gap-y-2
            xl:grid-cols-3 xl:grid-rows-1 bg-neutral-900'
         >
            <Firepower />
            <Mobility />
            <Survivability />
            <Other />
            <Spotting />
            <Concealment />
         </TableContainer>
      </section>
   )
}

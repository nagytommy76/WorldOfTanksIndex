import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import Firepower from './Firepower/Firepower'
import Mobility from './Mobility/Mobility'
import Survivability from './Survivability/Survivability'
import Other from './Other/Other'
import Concealment from './Concealment/Concealment'
import Spotting from './Spotting/Spotting'
import MechanicsContainer from './Mechanics/MechanicsContainer'

export default function DetailsTable() {
   return (
      <section className='w-full'>
         <Typography gutterBottom variant='h5'>
            Tank specifications
         </Typography>
         <TableContainer className='bg-neutral-900 min-h-[750px] w-full flex flex-col gap-4 sm:flex-row'>
            <div className='xl:flex-1'>
               <Firepower />
               <Survivability />
            </div>
            <div className='xl:flex-1'>
               <Mobility />
               <Other />
               <Spotting />
               <Concealment />
               <MechanicsContainer />
            </div>
         </TableContainer>
      </section>
   )
}

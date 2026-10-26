import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import SectionTitle from './Includes/SectionTitle'
import { FAQ_ITEMS } from './Data/faq'

export default function Faq() {
   return (
      <section>
         <SectionTitle title='Frequently asked questions' />
         <div className='max-w-4xl mx-auto'>
            {FAQ_ITEMS.map(({ question, answer }) => (
               <Accordion key={question} disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography variant='subtitle1' component='h3' fontWeight={600}>
                        {question}
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography variant='body2' color='text.secondary'>
                        {answer}
                     </Typography>
                  </AccordionDetails>
               </Accordion>
            ))}
         </div>
      </section>
   )
}

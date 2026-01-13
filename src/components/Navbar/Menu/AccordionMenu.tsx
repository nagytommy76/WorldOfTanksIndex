import React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import FlagLinks from './FlagLinks'

export default function AccordionMenu({
   expanded,
   handleExpandChange,
   handleClose,
   path = 'techtree',
   accordionName = 'Tech Tree Tanks',
}: {
   expanded: string | false
   handleExpandChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
   handleClose: () => void
   path?: string
   accordionName?: string
}) {
   return (
      <Accordion
         disableGutters
         expanded={expanded === accordionName.toLowerCase()}
         onChange={handleExpandChange(accordionName.toLowerCase())}
      >
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${accordionName}-content`}
            id={`${accordionName}-header`}
         >
            <Typography component='span' sx={{ width: '190px', flexShrink: 0 }}>
               {accordionName}
            </Typography>
         </AccordionSummary>
         <AccordionDetails>
            <FlagLinks handleClose={handleClose} path={path} />
         </AccordionDetails>
      </Accordion>
   )
}

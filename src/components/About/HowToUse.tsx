import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'

import SectionTitle from './Includes/SectionTitle'
import { HOW_TO_STEPS } from './Data/features'

export default function HowToUse() {
   return (
      <section>
         <SectionTitle title='How to use it' subtitle='From search to a fully configured vehicle in four steps.' />
         <Paper variant='outlined' className='max-w-3xl mx-auto p-6'>
            <Stepper orientation='vertical' activeStep={-1}>
               {HOW_TO_STEPS.map(({ label, description }) => (
                  <Step key={label} expanded>
                     <StepLabel>
                        <Typography variant='subtitle1' fontWeight={600}>
                           {label}
                        </Typography>
                     </StepLabel>
                     <StepContent>
                        <Typography variant='body2' color='text.secondary'>
                           {description}
                        </Typography>
                     </StepContent>
                  </Step>
               ))}
            </Stepper>
         </Paper>
      </section>
   )
}

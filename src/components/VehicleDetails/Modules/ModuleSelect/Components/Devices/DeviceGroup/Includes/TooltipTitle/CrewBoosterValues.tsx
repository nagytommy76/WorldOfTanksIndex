import Typography from '@mui/material/Typography'
import ReturnPercentValue from '@/helpers/returnPercentValue'
import { ReturnCrewSkillBoosterString } from './ReturnDisplayString'

export default function CrewBoosterValues({ name, value }: { name: string; value: number }) {
   const displayString = ReturnCrewSkillBoosterString(value)[name]

   if (!displayString) {
      return null
   }

   const finalHighlighted = ReturnPercentValue(displayString.highlightedText)

   return (
      <Typography variant='body2'>
         <span>{displayString.text}</span>
         <span className='font-bold text-green-500'>{displayString.prefix}</span>
         <span className='font-bold text-green-500'>{finalHighlighted}</span>
         <span className='font-bold text-green-500'>{displayString.suffix}</span>
      </Typography>
   )
}

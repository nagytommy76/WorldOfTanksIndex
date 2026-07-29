import { TypographyVariant } from '@mui/material'
import Typography from '@mui/material/Typography'

export default function ReturnTypography({
   text,
   variant = 'h5',
}: {
   text: string
   variant?: TypographyVariant
}) {
   return (
      <Typography variant={variant} textAlign={'center'} className='mb-5'>
         {text}
      </Typography>
   )
}

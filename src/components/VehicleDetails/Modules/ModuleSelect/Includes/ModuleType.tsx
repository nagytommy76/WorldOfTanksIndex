import Typography from '@mui/material/Typography'

export default function ReturnTypography({ text }: { text: string }) {
   return (
      <Typography variant='h5' textAlign={'center'} className='text-xl my-1'>
         {text}
      </Typography>
   )
}

import Typography from '@mui/material/Typography'

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
   return (
      <header className='text-center mb-8'>
         <Typography variant='h4' component='h2' className='font-semibold xl:text-4xl text-2xl'>
            {title}
         </Typography>
         {subtitle && (
            <Typography variant='body1' color='text.secondary' className='mt-2'>
               {subtitle}
            </Typography>
         )}
      </header>
   )
}

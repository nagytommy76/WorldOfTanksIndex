import Typography from '@mui/material/Typography'

const tier = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default function TierList() {
   return (
      <ul className='mt-5 flex flex-row justify-center gap-3'>
         {tier.map((item) => (
            <li className='w-[110px] text-center' key={item}>
               <Typography variant='h6'>Tier {item}</Typography>
            </li>
         ))}
      </ul>
   )
}

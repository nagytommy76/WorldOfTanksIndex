import Typography from '@mui/material/Typography'

import tiers from '@/lib/tierList'

export default function TierList() {
   return (
      <ul className='mt-5 flex flex-row justify-center gap-3'>
         {tiers.map((item) => (
            <li className='w-[110px] text-center' key={item}>
               <Typography variant='h6'>Tier {item}</Typography>
            </li>
         ))}
      </ul>
   )
}

import Image from 'next/image'

import { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'
import useCosts from '../Hooks/useCosts'

import Typography from '@mui/material/Typography'

function ReturnCost({ cost, type = 'xp' }: { cost: number; type?: 'xp' | 'credits' }) {
   return (
      <div className='flex'>
         {cost.toLocaleString()}
         <Image src={`/icons/currency/${type}.png`} alt='XP' width={20} height={20} />
      </div>
   )
}

export default function Costs({ steps }: { steps: IResolvedTreeStep[] | undefined }) {
   const { CreditsCost, XPCost } = useCosts(steps)

   if (XPCost === 0 && CreditsCost === 0) return <div className='h-5'></div>

   return (
      <>
         <Typography variant='caption' color='primary' className='flex gap-2'>
            COST: {XPCost > 0 && <ReturnCost cost={XPCost} />}
            {CreditsCost > 0 && <ReturnCost cost={CreditsCost} type='credits' />}
         </Typography>
      </>
   )
}

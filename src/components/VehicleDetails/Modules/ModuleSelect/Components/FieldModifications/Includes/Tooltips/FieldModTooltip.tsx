import Typography from '@mui/material/Typography'
import Image from 'next/image'

import type { IModifierOp } from '@Models/FieldModifications/FieldModificationTypes'
import type { IResolvedTreeStep } from '@Models/FieldModifications/TreeTypes'

import KpiRow from './KpiRow'

/**
 * @param subtitle Small text above the title, e.g. 'Level II'
 * @param title e.g. 'Valves Tuning (Setup 1)'
 * @param kpis Stat changes of the modification
 * @param cost Unlock cost of the step, hidden when it is 0
 * @param note Extra line under the stats
 */
export default function FieldModTooltip({
   subtitle,
   title,
   kpis = [],
   cost = null,
   note,
}: {
   subtitle?: string
   title: string
   kpis?: IModifierOp[]
   cost?: IResolvedTreeStep['cost']
   note?: string
}) {
   return (
      <section className='min-w-[260px] max-w-[360px] bg-[#121212] p-3'>
         {subtitle && (
            <Typography variant='caption' className='text-white/50'>
               {subtitle}
            </Typography>
         )}
         <Typography variant='subtitle1' fontWeight={700}>
            {title}
         </Typography>
         {kpis.length > 0 && (
            <div className='mt-1 flex flex-col gap-0.5'>
               {kpis.map((kpi, index) => (
                  <KpiRow key={`${kpi.name}-${index}`} kpi={kpi} />
               ))}
            </div>
         )}
         {note && (
            <Typography variant='caption' className='mt-2 block text-white/50'>
               {note}
            </Typography>
         )}
         {cost && cost.amount > 0 && (
            <Typography variant='caption' className='mt-2 flex items-center text-amber-400'>
               {cost.currency === 'xp' ? (
                  <>
                     Unlock cost: {cost.amount.toLocaleString('en-US')}
                     <Image src={'/icons/currency/xp.png'} alt='XP' width={25} height={25} />
                  </>
               ) : (
                  <>
                     Buy cost: {cost.amount.toLocaleString('en-US')}
                     <Image src={'/icons/currency/credits.png'} alt='Credits' width={25} height={25} />
                  </>
               )}
            </Typography>
         )}
      </section>
   )
}

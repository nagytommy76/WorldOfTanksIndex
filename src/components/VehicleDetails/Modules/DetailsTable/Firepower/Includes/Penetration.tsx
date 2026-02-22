import type { ShellDiffMapState } from '@/types/VehicleDetails/Modifiers'
import TableRowComponent from '../../Includes/TableRow'
import Typography from '@mui/material/Typography'

export default function Penetration({
   piercingPower,
   shellDamageDiff,
}: {
   piercingPower: number[]
   shellDamageDiff: ShellDiffMapState
}) {
   return (
      <TableRowComponent
         iconSrc='/icons/firepower/avgPiercingPower.png'
         titleText='Penetration (at 50/500 m)'
         valueText={`
                  ${piercingPower[0]} /
                  ${piercingPower[1]}
               `}
         unit='mm'
         modifiers={
            shellDamageDiff && [
               {
                  difference: shellDamageDiff['piercingPower[0]']?.difference ?? 0,
                  improved: shellDamageDiff?.['piercingPower[0]']?.improved || false,
               },
               {
                  difference: shellDamageDiff?.['piercingPower[1]']?.difference ?? 0,
                  improved: shellDamageDiff?.['piercingPower[1]']?.improved || false,
               },
            ]
         }
         TooltipTitle={
            <section className='min-w-[220px] min-h-[90px] flex flex-col gap-2'>
               <Typography variant='body1'>Avarage Penetration +/- 25%</Typography>
               <div>
                  <Typography variant='body1'>At 50 meters</Typography>
                  <Typography variant='body2'>Min: {piercingPower[0] * 0.75} pen</Typography>
                  <Typography variant='body2'>Max: {piercingPower[0] * 1.25} pen</Typography>
               </div>
               <div>
                  <Typography variant='body1'>At 500 meters</Typography>
                  <Typography variant='body2'>Min: {piercingPower[1] * 0.75} pen</Typography>
                  <Typography variant='body2'>Max: {piercingPower[1] * 1.25} pen</Typography>
               </div>
            </section>
         }
      />
   )
}

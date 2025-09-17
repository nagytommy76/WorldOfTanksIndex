import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export default function TableRowComponent({
   titleText,
   valueText,
   unit,
   paddingLeft,
}: {
   titleText: string
   valueText: string | number
   unit?: string
   paddingLeft?: boolean
}) {
   return (
      <TableRow className='max-h-[25px]'>
         <TableCell component='th' scope='row'>
            <Typography className={paddingLeft ? 'pl-3' : ''} variant='caption'>
               {titleText}
            </Typography>
         </TableCell>
         <TableCell align='right'>
            <div className='flex flex-row justify-end gap-1 items-center'>
               <Typography className='text-green-300' variant='subtitle2'>
                  {valueText}
               </Typography>
               <Typography className='opacity-80' variant='caption' fontSize={10}>
                  {unit}
               </Typography>
            </div>
         </TableCell>
      </TableRow>
   )
}

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

export default function TableRowComponent({
   titleText,
   valueText,
   unit,
   paddingLeft,
   iconSrc,
}: {
   titleText: string
   valueText: string | number
   unit?: string
   paddingLeft?: boolean
   iconSrc?: string
}) {
   return (
      <TableRow className='max-h-[25px] ' hover>
         <TableCell component='th' scope='row' className='px-1'>
            <div className={`${paddingLeft ? 'pl-7' : ''} flex felx-row items-center gap-2`}>
               {iconSrc && (
                  <Image
                     src={iconSrc}
                     alt={titleText}
                     title={titleText}
                     width={35}
                     height={35}
                     className='object-cover w-[35px]'
                  />
               )}
               <Typography variant='body2' fontSize={14} sx={{ opacity: 0.85 }}>
                  {titleText}
               </Typography>
            </div>
         </TableCell>
         <TableCell align='right' className='px-1'>
            <div className='flex flex-row justify-end gap-1 items-center'>
               <Typography className='text-white font-semibold' variant='subtitle1' fontSize={15}>
                  {valueText}
               </Typography>
               <Typography className='opacity-65' variant='subtitle2' fontSize={11}>
                  {unit}
               </Typography>
            </div>
         </TableCell>
      </TableRow>
   )
}

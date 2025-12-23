import Image from 'next/image'
import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function TableHeadComponent({
   headTitle,
   className = 'bg-lime-950',
   iconSrc,
}: {
   headTitle: string
   className?: string
   iconSrc?: string
}) {
   return (
      <TableHead className={className}>
         <TableRow>
            <TableCell variant='head' className='border-b-0'>
               <Typography variant='h5'>{headTitle}</Typography>
            </TableCell>
            <TableCell variant='head' className='h-full flex justify-end border-b-0'>
               {iconSrc && <Image src={iconSrc} alt='headTitle' width={30} height={30} title={headTitle} />}
            </TableCell>
         </TableRow>
      </TableHead>
   )
}

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function TableHeadComponent({
   headTitle,
   className = 'bg-lime-900',
}: {
   headTitle: string
   className?: string
}) {
   return (
      <TableHead>
         <TableRow className={className}>
            <TableCell>
               <Typography variant='h5'>{headTitle}</Typography>
            </TableCell>
            <TableCell align='right'>icon</TableCell>
         </TableRow>
      </TableHead>
   )
}

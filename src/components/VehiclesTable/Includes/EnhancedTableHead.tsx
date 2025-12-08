import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import type { EnhancedTableProps, Data, HeadCell } from '../Types'

const headCells: readonly HeadCell[] = [
   {
      id: 'nation',
      numeric: false,
      disablePadding: true,
      label: 'Nation',
   },
   {
      id: 'type',
      numeric: false,
      disablePadding: true,
      label: 'Type',
   },
   {
      id: 'tier',
      numeric: true,
      disablePadding: true,
      label: 'Tier',
   },
   {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Vehicle name',
   },
   {
      id: 'price',
      numeric: true,
      disablePadding: true,
      label: 'Price',
   },
]

export default function EnhancedTableHead(props: EnhancedTableProps) {
   const { order, orderBy, onRequestSort } = props
   const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
   }

   return (
      <TableHead>
         <TableRow>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align='left'
                  sortDirection={orderBy === headCell.id ? order : false}
                  className='px-0'
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                     className='text-[20px]'
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <Box component='span' sx={visuallyHidden}>
                           {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                     ) : null}
                  </TableSortLabel>
               </TableCell>
            ))}
            <TableCell align={'right'} padding={'normal'}></TableCell>
         </TableRow>
      </TableHead>
   )
}

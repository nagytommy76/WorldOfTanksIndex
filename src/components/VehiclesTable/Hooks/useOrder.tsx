import { useState } from 'react'
import type { Order, Data } from '../Types'

export default function useOrder() {
   const [order, setOrder] = useState<Order>('desc')
   const [orderBy, setOrderBy] = useState<keyof Data>('tier')

   const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   return { handleRequestSort, order, orderBy }
}

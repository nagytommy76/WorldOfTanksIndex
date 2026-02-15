import { useContext } from 'react'
import { OrderDispatchContext } from '@/OrderContext/OrderContext'

import Button from '@mui/material/Button'

export default function ClearFiltersBtn() {
   const { orderDispatch } = useContext(OrderDispatchContext)

   return (
      <Button onClick={() => orderDispatch({ type: 'RESET_FILTERS', payload: null })}>
         Reset All Filters
      </Button>
   )
}

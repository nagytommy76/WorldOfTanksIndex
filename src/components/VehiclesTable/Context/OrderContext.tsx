'use client'
import type { IOrderContext, IOrderReducerState } from './Types'
import type { CardTanksType } from '@/types/VehicleDetails/Vehicle'
import { InitialReducerState } from './Types'

import { createContext, useReducer, useEffect } from 'react'
import OrderReducer from './OrderReducer'

export const OrderContext = createContext<IOrderContext>({
   orderReducer: {} as IOrderReducerState,
   orderDispatch: () => {},
})

export default function OrderContextProvider({
   children,
   allVehicles,
}: {
   children: React.ReactNode
   allVehicles: CardTanksType[]
}) {
   const [orderReducer, orderDispatch] = useReducer(OrderReducer, InitialReducerState)

   useEffect(() => {
      if (allVehicles) {
         orderDispatch({ type: 'SET_ORDER_VEHICLES', payload: allVehicles })
      }
   }, [allVehicles])

   return (
      <OrderContext.Provider
         value={{
            orderReducer,
            orderDispatch,
         }}
      >
         {children}
      </OrderContext.Provider>
   )
}

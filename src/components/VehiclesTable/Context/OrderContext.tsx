'use client'
import type { IOrderContext, IOrderDispatchContext, IOrderReducerState } from './Types'
import { InitialReducerState } from './Types'

import { createContext, useReducer } from 'react'
import OrderReducer from './OrderReducer'

export const OrderContext = createContext<IOrderContext>({
   orderReducer: {} as IOrderReducerState,
})
export const OrderDispatchContext = createContext<IOrderDispatchContext>({
   orderDispatch: () => {},
})

export default function OrderContextProvider({ children }: { children: React.ReactNode }) {
   const [orderReducer, orderDispatch] = useReducer(OrderReducer, InitialReducerState)

   return (
      <OrderContext.Provider
         value={{
            orderReducer,
         }}
      >
         <OrderDispatchContext.Provider value={{ orderDispatch }}>{children}</OrderDispatchContext.Provider>
      </OrderContext.Provider>
   )
}

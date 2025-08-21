import { createContext, useReducer } from 'react'
import DetailsReducer from './DetailsReducer'
import { IDetailsContext, detailsInitialState } from './DetailsType'
import { IModuleDetails } from '@/types/VehicleDetails/module'

import useGetModuleDetails from '../Hooks/useGetModuleDetails'

export const DetailsContext = createContext<IDetailsContext>({
   vehicleProfileReducer: {
      vehicleProfile: {} as IModuleDetails,
   },
   vehicleProfileDispatch: function (): void {
      throw new Error('Function not implemented.')
   },
})

export default function DetailsContextProvider({ children }: { children: React.ReactNode }) {
   const [vehicleProfileReducer, vehicleProfileDispatch] = useReducer(DetailsReducer, detailsInitialState)
   useGetModuleDetails(vehicleProfileDispatch)

   return (
      <DetailsContext.Provider value={{ vehicleProfileReducer, vehicleProfileDispatch }}>
         {children}
      </DetailsContext.Provider>
   )
}

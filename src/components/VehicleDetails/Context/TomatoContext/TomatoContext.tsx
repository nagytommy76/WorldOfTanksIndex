import { createContext } from 'react'
import useGetTomatoTankStats from '../Hooks/useGetTomatoTankStats'
import type { ITomatoTankStats, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export const TomatoContext = createContext<ITomatoTankStats>({
   tankData: {} as ITankData,
})

export default function TomatoContextProvider({ children }: { children: React.ReactNode }) {
   const tankData = useGetTomatoTankStats()

   return <TomatoContext.Provider value={tankData}>{children}</TomatoContext.Provider>
}

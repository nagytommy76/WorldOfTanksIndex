import type { ITankData } from '@Types/VehicleDetails/Vehicle'

export type RequestData = Pick<
   ITankData,
   'id' | 'xmlId' | 'type' | 'tier' | 'nation' | 'name' | 'tankDetails'
>

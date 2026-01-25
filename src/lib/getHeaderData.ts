import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'
import type { ITankData } from '@/types/VehicleDetails/Vehicle'

type HeaderBase = Pick<ITankData, 'name' | 'type' | 'tier' | 'nation' | 'tags' | 'mechanics'>

type HeaderWithDetails = HeaderBase & {
   tankDetails: ITankData['tankDetails']
}

type HeaderWithoutDetails = HeaderBase & {
   tankDetails?: never
}

type HeaderData = HeaderWithDetails | HeaderWithoutDetails

export default async function getHeaderData(
   tank_name: string,
   tank_id: string,
): Promise<HeaderData | null | undefined> {
   try {
      await dbConnect()
      if (tank_id === 'null') {
         return await VehicleModel.findOne({
            xmlId: tank_name,
         })
            .select(['name', 'type', 'tier', 'nation', 'tags', 'mechanics'])
            .lean<HeaderWithoutDetails>()
      }
      return await VehicleModel.findOne({
         id: Number(tank_id),
         xmlId: tank_name,
      })
         .select([
            'tankDetails.name',
            'tankDetails.short_name',
            'tankDetails.images',
            'tankDetails.description',
            'type',
            'name',
            'tier',
            'nation',
            'tags',
            'mechanics',
         ])
         .lean<HeaderWithDetails>()
   } catch (error) {
      console.log(error)
   }
}

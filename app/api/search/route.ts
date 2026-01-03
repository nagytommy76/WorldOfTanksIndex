import { NextResponse, type NextRequest } from 'next/server'
import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

export async function GET(request: NextRequest) {
   const vehicleNameParam = request.nextUrl.searchParams.get('vehicleName') as string
   try {
      await dbConnect()
      // Remove hyphens and spaces from the search term and escape special regex characters
      const sanitizedParam = vehicleNameParam.replace(/[-\s]/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      // Create a regex pattern that matches the characters with optional hyphens/spaces between them
      const regexPattern = sanitizedParam.split('').join('[-\\s]*')
      const vehicleName = new RegExp(regexPattern, 'i')

      const foundTanks = await VehicleModel.find({
         $or: [
            { name: vehicleName },
            { 'tankDetails.name': vehicleName },
            { 'tankDetails.short_name': vehicleName },
            { xmlId: vehicleName },
         ],
      })
         .select([
            'type',
            'id',
            'xmlId',
            'tier',
            'nation',
            'name',
            'tankDetails.images.big_icon',
            'tankDetails.name',
            'tankDetails.is_gift',
            'tankDetails.is_premium',
         ])
         .sort({ tier: -1, type: 1 })
         .lean()

      return NextResponse.json({ foundTanks })
   } catch (error) {
      return NextResponse.json(
         { error: 'Failed to fetch tech tree vehicles', errorType: error },
         { status: 500 }
      )
   }
}

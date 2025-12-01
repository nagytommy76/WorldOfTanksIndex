import { NextResponse, type NextRequest } from 'next/server'
import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

export async function GET(request: NextRequest) {
   const nation = request.nextUrl.searchParams.get('nation')
   if (!nation) return NextResponse.json({ error: 'Nation parameter is required' }, { status: 404 })
   try {
      await dbConnect()
      const collectorsVehicles = await VehicleModel.find({
         nation,
         notInShop: false,
         tankDetails: { $ne: null },
         tier: { $ne: 1 },
         $and: [
            { 'tankDetails.prices_xp': { $eq: null } },
            { 'tankDetails.is_gift': { $eq: false } },
            { 'tankDetails.is_premium': { $eq: false } },
         ],
      })
         .select([
            'tankDetails.name',
            'tankDetails.shortName',
            'tankDetails.images',
            'price',
            'type',
            'tier',
            'id',
            'name',
            'notInShop',
            'xmlId',
            'nation',
         ])
         .sort({ tier: 1, name: 1 })
         .lean()

      return NextResponse.json({ vehicles: collectorsVehicles }, { status: 200 })
   } catch (err) {
      return NextResponse.json(
         { error: 'Failed to fetch tech tree vehicles', errorType: err },
         { status: 500 }
      )
   }
}

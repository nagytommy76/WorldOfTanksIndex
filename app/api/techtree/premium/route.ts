import { NextResponse, type NextRequest } from 'next/server'
import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

export async function GET(request: NextRequest) {
   const nation = request.nextUrl.searchParams.get('nation')
   if (!nation) return NextResponse.json({ error: 'Nation parameter is required' }, { status: 404 })
   try {
      await dbConnect()
      const premiumVehicles = await VehicleModel.find({
         nation,
         tankDetails: { $ne: null },
         $or: [{ 'tankDetails.is_gift': { $eq: true } }, { 'tankDetails.is_premium': { $eq: true } }],
      })
         .select([
            'tankDetails.name',
            'tankDetails.short_name',
            'tankDetails.images',
            'price',
            'type',
            'tier',
            'tags',
            'id',
            '_id',
            'name',
            'notInShop',
            'xmlId',
            'nation',
         ])
         .sort({ tier: -1, name: 1 })
         .lean()
      return NextResponse.json({ vehicles: premiumVehicles })
   } catch (error) {
      return NextResponse.json(
         { error: 'Failed to fetch tech tree vehicles', errorType: error },
         { status: 500 },
      )
   }
}

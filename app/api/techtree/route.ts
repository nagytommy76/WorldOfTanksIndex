import { NextResponse, type NextRequest } from 'next/server'
import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

export async function GET(request: NextRequest) {
   const nation = request.nextUrl.searchParams.get('nation')
   if (!nation) return NextResponse.json({ error: 'Nation parameter is required' }, { status: 404 })
   try {
      await dbConnect()
      const techTreeVehicles = await VehicleModel.find({
         $and: [
            { nation },
            { notInShop: false },
            { tankDetails: { $ne: null } },
            { 'tankDetails.is_gift': { $eq: false } },
            { 'tankDetails.is_premium': { $eq: false } },
         ],
      })
         .select(['tankDetails', 'price', 'type', 'tier', 'id', 'name', 'notInShop', 'xmlId', 'nation'])
         .sort({ tier: 1, name: 1 })
         .lean()

      return NextResponse.json({ techTreeVehicles })
   } catch (err) {
      return NextResponse.json(
         { error: 'Failed to fetch tech tree vehicles', errorType: err },
         { status: 500 }
      )
   }
}

import dbConnect from '@/lib/ConnectDB'
import { NextResponse, NextRequest } from 'next/server'

import { DeviceModel } from '@Models/DevicesModel'

export async function GET(req: NextRequest) {
   const provisions = req.nextUrl.searchParams.get('provisions')
   if (!provisions) return NextResponse.json({ error: 'Provisions parameter is required' }, { status: 404 })
   try {
      const provisionsArray = JSON.parse(provisions)
      await dbConnect()

      const compatibleDevices = await DeviceModel.aggregate([
         {
            $match: {
               id: { $in: provisionsArray },
               deviceType: {
                  $in: ['deluxe', 'tiers', 'trophy', 'modernized'],
               },
            },
         },
      ])

      return NextResponse.json({ compatibleDevices }, { status: 200 })
   } catch (error) {
      console.log(`Error during get devices: `, error)
      return NextResponse.json({ error: 'Error during get devices', errorType: error }, { status: 500 })
   }
}

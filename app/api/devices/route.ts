import dbConnect from '@/lib/ConnectDB'

import { DeviceModel } from '@Models/DevicesModel'

export async function GET() {
   try {
      await dbConnect()

      const allDevices = await DeviceModel.find({}).lean()

      return Response.json({ allDevices }, { status: 200 })
   } catch (error) {
      console.log(`Error during get devices: `, error)
   }
}

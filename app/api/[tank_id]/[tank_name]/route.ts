import { NextResponse } from 'next/server'
import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

export async function GET(
   req: Request,
   { params }: { params: Promise<{ tank_id: string; tank_name: string }> }
) {
   const { tank_id, tank_name } = await params
   await dbConnect()
   try {
      const vehicleStats = await VehicleModel.findOne({
         id: Number(tank_id),
         // xmlId: tank_name,
      })

      return NextResponse.json({ vehicleStats }, { status: 200 })
   } catch (err) {
      return NextResponse.json({ error: err, details: (err as Error).message }, { status: 500 })
   }
}

// import { NextResponse } from 'next/server'
import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

export async function GET(
   req: Request,
   { params }: { params: Promise<{ tank_id: string; tank_name: string }> },
) {
   const { tank_id, tank_name } = await params
   await dbConnect()
   try {
      if (tank_id === 'null') {
         const vehicleStats = await VehicleModel.findOne({
            xmlId: tank_name,
         })
         return Response.json({ vehicleStats }, { status: 200 })
      }
      const vehicleStats = await VehicleModel.findOne({
         id: Number(tank_id),
         xmlId: tank_name,
      })

      if (!vehicleStats) {
         return Response.json({ error: 'Vehicle not found' }, { status: 404 })
      }

      return Response.json({ vehicleStats }, { status: 200 })
   } catch (err) {
      return Response.json({ error: err, details: (err as Error).message }, { status: 500 })
   }
}

import dbConnect from '@/lib/ConnectDB'
import { NextResponse, NextRequest } from 'next/server'

import { DeviceModel } from '@Models/DevicesModel'

export async function GET(req: NextRequest) {
   /**
    * crewSkillBattleBooster || equipmentBattleBooster
    */
   const boosterType = req.nextUrl.searchParams.get('boosterType')
   const provisions = req.nextUrl.searchParams.get('provisions')
   if (!boosterType || !provisions)
      return NextResponse.json({ error: 'Provisions parameter is required' }, { status: 404 })

   try {
      await dbConnect()
      const booster = JSON.parse(boosterType)
      const provisionsArray = JSON.parse(provisions)
      const battleBoosters = await DeviceModel.aggregate([
         {
            $match: {
               tags: booster,
               id: { $in: provisionsArray },
            },
         },
         {
            $sort: { name: 1 },
         },
      ])

      return NextResponse.json({ battleBoosters }, { status: 200 })
   } catch (error) {
      console.log(`Error during get Battle Boosters: `, error)
      return NextResponse.json(
         { error: 'Error during get Battle Boosters', errorType: error },
         { status: 500 },
      )
   }
}

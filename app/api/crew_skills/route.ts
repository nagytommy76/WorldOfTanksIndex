import dbConnect from '@/lib/ConnectDB'
import { NextResponse, NextRequest } from 'next/server'

import { CrewSkillModel } from '@Models/CrewSkillModel'

export async function GET(req: NextRequest) {
   try {
      await dbConnect()

      const crewSkills = await CrewSkillModel.aggregate([
         {
            $group: {
               _id: '$role',
               skills: { $push: '$$ROOT' },
            },
         },
         {
            $sort: { _id: 1 },
         },
      ])

      const grouppedCrewSkills = crewSkills.reduce((accumulator, currentValue) => {
         accumulator[currentValue._id] = currentValue.skills
         return accumulator
      }, {})

      return NextResponse.json({ grouppedCrewSkills }, { status: 200 })
   } catch (error) {
      console.log(`Error during get crew skills: `, error)
      return NextResponse.json({ error: 'Error during get crew skills', errorType: error }, { status: 500 })
   }
}

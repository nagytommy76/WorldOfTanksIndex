import dbConnect from '@/lib/ConnectDB'
import { NextResponse, NextRequest } from 'next/server'

import { CrewSkillModel } from '@Models/CrewSkillModel'
import CrewSkills, { type CrewSkillRoles } from '@/Classes/CrewSkills'

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
      }, {}) as { [Roles in CrewSkillRoles]: CrewSkills[] }

      const crewOrder = ['common', 'commander', 'loader', 'driver', 'radioman', 'gunner'] as const
      const sortedCrew = Object.fromEntries(
         crewOrder
            .filter((role) => role in grouppedCrewSkills)
            .map((role) => [role, grouppedCrewSkills[role as CrewSkillRoles]]),
      ) as Record<CrewSkillRoles, (typeof grouppedCrewSkills)[CrewSkillRoles]>

      return NextResponse.json({ grouppedCrewSkills: sortedCrew }, { status: 200 })
   } catch (error) {
      console.log(`Error during get crew skills: `, error)
      return NextResponse.json({ error: 'Error during get crew skills', errorType: error }, { status: 500 })
   }
}

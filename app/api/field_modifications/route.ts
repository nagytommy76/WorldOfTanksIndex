import { NextResponse, type NextRequest } from 'next/server'
import dbConnect from '@/lib/ConnectDB'

import { FieldModificationTree } from '@Models/FieldModifications/FieldModificationTree.model'
import { FieldModification } from '@Models/FieldModifications/FieldModification.model'
import { FieldModificationPrice } from '@Models/FieldModifications/Price.model'
import type { IFieldModification } from '@Models/FieldModifications/FieldModificationTypes'
import { resolveFieldModificationTree } from '@/utils/resolveFieldModificationTree'
import { isFieldModificationTier } from '@/utils/fieldModificationTiers'
import { VEHICLE_ROLES, type VehicleRoles } from '@Types/types'

export async function GET(req: NextRequest) {
   /**
    * role: role_LT_universal || role_HT_universal ...
    * tier: 1 - 11
    */
   const role = req.headers.get('role')
   const tier = Number(req.headers.get('tier'))

   if (!role || !VEHICLE_ROLES.includes(role as VehicleRoles))
      return NextResponse.json({ error: 'Valid role header is required' }, { status: 400 })
   if (!isFieldModificationTier(tier))
      return NextResponse.json(
         { error: 'Valid tier header is required minimum Tier 6, maximum tier 10' },
         { status: 400 },
      )

   try {
      await dbConnect()

      const tree = await FieldModificationTree.findOne({ role }).lean()
      if (!tree) return NextResponse.json({ error: 'Field modification tree not found' }, { status: 404 })

      const modificationKeys = [
         ...new Set(
            tree.steps.filter((step) => step.action.type !== 'feature').map((step) => step.action.value),
         ),
      ]
      const priceKeys = [...new Set(tree.steps.map((step) => step.price))]

      // Base & pair documents share one collection (discriminator), so a single query returns both
      const [modifications, prices] = await Promise.all([
         FieldModification.find({ key: { $in: modificationKeys } }).lean(),
         FieldModificationPrice.find({ key: { $in: priceKeys } }).lean(),
      ])

      const fieldModificationTree = resolveFieldModificationTree(
         tree,
         modifications as unknown as IFieldModification[],
         prices,
         tier,
      )

      return NextResponse.json({ fieldModificationTree }, { status: 200 })
   } catch (error) {
      console.log(`Error during get field modifications: `, error)
      return NextResponse.json(
         { error: 'Error during get field modifications', errorType: error },
         { status: 500 },
      )
   }
}

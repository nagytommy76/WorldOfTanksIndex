/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/field_modifications/route'
import { FieldModificationTree } from '@Models/FieldModifications/FieldModificationTree.model'
import { BaseModification, PairModification } from '@Models/FieldModifications/FieldModification.model'
import { FieldModificationPrice } from '@Models/FieldModifications/Price.model'
import type { IResolvedFieldModificationTree } from '@Models/FieldModifications/TreeTypes'
import * as mockDB from '@/__tests__/lib/db'
import {
   MockFieldModificationTree,
   MockBaseModifications,
   MockPairModification,
   MockFieldModificationPrices,
} from '@/__tests__/mocks/FieldModifications'

const createRequest = (headers: Record<string, string>) =>
   new NextRequest(new URL('http://localhost:3000/api/field_modifications'), { method: 'GET', headers })

beforeAll(async () => {
   await mockDB.startMongoMemoryServer()
})
beforeEach(async () => {
   await FieldModificationTree.create(MockFieldModificationTree)
   await BaseModification.create(MockBaseModifications)
   await PairModification.create(MockPairModification)
   await FieldModificationPrice.create(MockFieldModificationPrices)
})
afterEach(async () => {
   await mockDB.clearDatabase()
})
afterAll(async () => {
   await mockDB.stopMongoMemoryServer()
})

describe('GET /api/field_modifications', () => {
   it('should return the resolved tree with status code of 200', async () => {
      const response = await GET(createRequest({ role: 'role_LT_universal', tier: '10' }))
      const { fieldModificationTree } = (await response.json()) as {
         fieldModificationTree: IResolvedFieldModificationTree
      }

      expect(response.status).toBe(200)
      expect(fieldModificationTree.role).toBe('role_LT_universal')
      expect(fieldModificationTree.steps).toHaveLength(4)
      expect(fieldModificationTree.steps[0].modification).toBeNull()
      expect(fieldModificationTree.steps[1].modification?.kind).toBe('base')
      expect(fieldModificationTree.steps[2].modification?.kind).toBe('pair')
      expect(fieldModificationTree.steps[1].cost).toEqual({ amount: 28000, currency: 'xp' })
   })

   it('should filter steps by the tier header', async () => {
      const response = await GET(createRequest({ role: 'role_LT_universal', tier: '8' }))
      const { fieldModificationTree } = (await response.json()) as {
         fieldModificationTree: IResolvedFieldModificationTree
      }

      expect(response.status).toBe(200)
      expect(fieldModificationTree.steps.map((step) => step.id)).toEqual([1, 2, 3])
   })

   it('should return 400 when the role header is missing or unknown', async () => {
      expect((await GET(createRequest({ tier: '10' }))).status).toBe(400)
      expect((await GET(createRequest({ role: 'role_WRONG', tier: '10' }))).status).toBe(400)
   })

   it('should return 400 when the tier header is missing or invalid', async () => {
      expect((await GET(createRequest({ role: 'role_LT_universal' }))).status).toBe(400)
      expect((await GET(createRequest({ role: 'role_LT_universal', tier: '12' }))).status).toBe(400)
      expect((await GET(createRequest({ role: 'role_LT_universal', tier: 'abc' }))).status).toBe(400)
   })

   it('should return 404 when there is no tree for the role', async () => {
      const response = await GET(createRequest({ role: 'role_HT_universal', tier: '10' }))
      expect(response.status).toBe(404)
   })
})

/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { VehicleModel } from '@Models/TankModel'
import { GET } from '@/app/api/[tank_id]/[tank_name]/route'
import * as mockDB from './lib/db'
import MockHirschkafer from './mocks/Hirschkafer'

beforeAll(async () => {
   await mockDB.startMongoMemoryServer()
   // 1. Seed the in-memory DB with a test tank
   await VehicleModel.create(MockHirschkafer)
})
afterEach(async () => {
   await mockDB.clearDatabase()
})
afterAll(async () => {
   await mockDB.stopMongoMemoryServer()
})

describe('Modules Page', () => {
   it('should query Tier XI Hirschkafer with status code of 200', async () => {
      // 2. Mock the NextRequest
      const req = new NextRequest(new URL(`http://localhost:3000/api/40977/G189_Hirschkafer`), {
         method: 'GET',
      })

      // 3. Call the handler directly
      const response = await GET(req, {
         params: Promise.resolve({
            tank_id: '40977',
            tank_name: 'G189_Hirschkafer',
         }),
      })

      expect(response.status).toBe(200)
   })
   it('should not return Tier XI Hirschkafer with status code of 404', async () => {
      // 2. Mock the NextRequest
      const req = new NextRequest(new URL(`http://localhost:3000/api/40977/G189_Hirschkafer`), {
         method: 'GET',
      })

      // 3. Call the handler directly
      const response = await GET(req, {
         params: Promise.resolve({
            tank_id: '40977',
            tank_name: 'WRONG_TANK_NAME',
         }),
      })

      expect(response.status).toBe(404)
   })
   it('should not return Supertest vehicle | G98_Waffentrager_E100 | with status code of 200', async () => {
      // 2. Mock the NextRequest
      const req = new NextRequest(new URL(`http://localhost:3000/api/null/G98_Waffentrager_E100`), {
         method: 'GET',
      })

      // 3. Call the handler directly
      const response = await GET(req, {
         params: Promise.resolve({
            tank_id: 'null',
            tank_name: 'G98_Waffentrager_E100',
         }),
      })

      expect(response.status).toBe(200)
   })
})

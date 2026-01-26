import { NextRequest } from 'next/server'
import { GET } from '@/app/api/[tank_id]/[tank_name]/route'
import * as mockDB from './lib/db'

// Mock the actual DB connection used by your route handlers
// jest.mock('../src/lib/ConnectDB', () => ({
//    connectDB: jest.fn().mockResolvedValue(undefined),
//    // Add other exports from your mongodb file
// }))

// beforeAll(async () => {
//    await mockDB.startMongoMemoryServer()
// })
// afterEach(async () => {
//    await mockDB.clearDatabase()
// })
// afterAll(async () => {
//    await mockDB.stopMongoMemoryServer()
// })
describe('Modules Page', () => {
   it('should query Grille15 with status code of 200', async () => {
      // 2. Mock the NextRequest
      const req = new NextRequest(new URL(`http://localhost:3000/api/19217/G121_Grille_15_L63`), {
         method: 'GET',
      })

      // 3. Call the handler directly
      const response = await GET(req, { params: { tank_id: '19217', tank_name: 'G121_Grille_15_L63' } })
      expect(response.status).toBe(200)
   })
   it('should query Grille15 with status code of 404', async () => {
      const req = new NextRequest(new URL(`http://localhost:3000/api/19217/G121_Grille_15_L63`), {
         method: 'GET',
      })

      const response = await GET(req, { params: { tank_id: '1900000', tank_name: 'G121_Grille_15_L63' } })
      expect(response.status).toBe(404)
   })
})

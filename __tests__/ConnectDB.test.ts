/**
 * @jest-environment node
 */
import ConnectDB from '@/lib/ConnectDB'

describe('Test ConnectDB function', () => {
   it('should skip connection in test environment', async () => {
      const connection = await ConnectDB()
      expect(connection).toBeUndefined()
   })
})

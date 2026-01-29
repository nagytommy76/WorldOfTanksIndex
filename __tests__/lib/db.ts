import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer

export async function startMongoMemoryServer() {
   if (mongoose.connection.readyState === 0) {
      mongoServer = await MongoMemoryServer.create()
      await mongoose.connect(mongoServer.getUri())
      // console.log('Connected to in-memory database')
   }
   return mongoServer
}

export async function stopMongoMemoryServer() {
   await mongoose.disconnect()
   await mongoose.connection.close()
   await mongoServer.stop()
   // console.log('MongoDB has stopped (stopMongoMemoryServer)')
}

export async function clearDatabase() {
   const collections = mongoose.connection.collections
   for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
   }
}

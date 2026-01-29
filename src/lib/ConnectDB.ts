import mongoose from 'mongoose'
export default async function dbConnect() {
   const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_CONNECTION_STRING!
   if (process.env.NODE_ENV === 'test') return
   try {
      if (!MONGODB_URI) {
         throw new Error('Please define the MONGODB_URI environment variable')
      }
      const { connection } = await mongoose.connect(MONGODB_URI as string)
      if (connection.readyState === 1) {
         return Promise.resolve(connection)
      }
   } catch (error) {
      console.error(error)
      return Promise.reject(error)
   }
}

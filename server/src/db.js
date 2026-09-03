import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set — check server/.env')
  }

  mongoose.connection.on('connected', () => {
    console.log('[db] Connected to MongoDB Atlas')
  })
  mongoose.connection.on('error', (err) => {
    console.error('[db] MongoDB connection error:', err.message)
  })

  await mongoose.connect(uri)
}

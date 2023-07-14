import { mongoDB } from './client'

const MONGO_DB_LOCAL = 'mongodb://user:password@localhost:27017'

export const connectToDatabase = (
  mongoDatabaseURI = process.env.DATABASE_URL || MONGO_DB_LOCAL,
) => mongoDB.connect(mongoDatabaseURI)

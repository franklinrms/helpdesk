import { MongoClient, Db } from 'mongodb'

class MongoDatabase {
  private client: MongoClient | null
  private db: Db | null

  constructor() {
    this.client = null
    this.db = null
  }

  public async connect(connectionString: string): Promise<void> {
    try {
      this.client = new MongoClient(connectionString)

      await this.client.connect()
      this.db = this.client.db('helpdesk')
    } catch (error) {
      console.error('Error connecting to database:', error)
      throw error
    }
  }

  public getDatabase(): Db {
    if (!this.db) {
      throw new Error('Error connecting to database')
    }
    return this.db
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
      console.log('Database connection blocked')
    }
  }
}

export const mongoDB = new MongoDatabase()

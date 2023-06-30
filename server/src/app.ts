import 'express-async-errors'

import express from 'express'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

export default class App {
  private app: express.Express

  constructor() {
    this.app = express()
    this.config()
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(routes)
    this.app.use(errorHandler)
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
  }
}

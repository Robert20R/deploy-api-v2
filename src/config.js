import { config } from 'dotenv'

config()

export default {
  port: process.env.PORT || 8080,
  host: process.env.HOST || '',
  user: process.env.USER || '',
  password: process.env.PASSWORD || '',
  db_database: process.env.DB_DATABASE || ''
}

// Get the client.
import mysql2 from 'mysql2'
import config from '../config.js'

const dbSettings = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.db_database
}

// Create the connection to database

export async function getConnection () {
  try {
    const pool = await mysql2.createConnection(dbSettings)
    return pool
  } catch (error) {
    console.log(error)
  }
}
export { mysql2 }

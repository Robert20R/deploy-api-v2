import express from 'express'
import config from './config.js'
import integrantesRouter from './routes/integrantes.routes.js'
import cors from 'cors'

const app = express()
app.set('port', config.port)
app.use(cors())

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// server config
app.use(integrantesRouter)

export default app

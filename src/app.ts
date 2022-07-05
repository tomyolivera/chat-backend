import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import UserRoutes from './Routes/user.routes'
import AuthRoutes from './Routes/auth.routes'

const app: Application = express()

const CorsOptions = {
    origin: '*',
    credentials: true,
    cors: true
}

app.use(cors(CorsOptions))
app.use(bodyParser.json())

// Routes
app.use('/api/auth', AuthRoutes)
app.use('/api/users', UserRoutes)

export default app
import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import UserRoutes from './Routes/user.routes'
// import { auth, ConfigParams } from 'express-openid-connect'
import AuthRoutes from './Routes/auth.routes'

const app: Application = express()

const CorsOptions = {
    origin: '*',
    credentials: true,
    cors: true
}

// const AuthOptions: ConfigParams = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.AUTH0_SECRET,
//     baseURL: 'http://localhost:3000',
//     clientID: process.env.AUTH0_CLIENT_ID,
//     issuerBaseURL: 'https://dev-0qjqjqjq.eu.auth0.com',
// }

app.use(cors(CorsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
// app.use(auth(AuthOptions))

// Routes
app.use('/api/auth', AuthRoutes)
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Authenticated' : 'Not authenticated')
// })
app.use('/api/users', UserRoutes)

export default app
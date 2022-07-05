import { Router } from 'express'
const AuthRoutes = Router()

import AuthController from '../Controllers/AuthController'

AuthRoutes.post('/login', AuthController.login)
AuthRoutes.post('/register', AuthController.register)
AuthRoutes.get('/logout', AuthController.isAuthenticated, AuthController.logout)

export default AuthRoutes
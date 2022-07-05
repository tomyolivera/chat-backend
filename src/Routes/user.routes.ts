import { Router } from 'express'
const UserRoutes = Router()

import UserController from '../Controllers/UserController'

UserRoutes.get('/', UserController.getAll)

export default UserRoutes
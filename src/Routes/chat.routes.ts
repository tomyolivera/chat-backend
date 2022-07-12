import { Router } from 'express'
const ChatRoutes = Router()

import ChatController from '../Controllers/ChatController'
import Middleware from '../Controllers/Middleware'

ChatRoutes.get('/', Middleware.isAuthenticated, ChatController.getAll)
ChatRoutes.post('/', Middleware.isAuthenticated, ChatController.create)

export default ChatRoutes
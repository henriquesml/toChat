import express from 'express'
import { SessionController, UserController } from './app/controllers'

const routes = express.Router()

routes.post('/session', SessionController.create)
routes.post('/users', UserController.create)

export default routes

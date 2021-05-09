import express from 'express'
import { SessinController, UserController } from './app/controllers'

const routes = express.Router()

routes.post('/session', new SessinController().create)
routes.post('/users', new UserController().create)

export default routes

import express from 'express'
import { makeUserController, makeSessionController } from './factories'

const userController = makeUserController()
const sessionController = makeSessionController()

const routes = express.Router()

routes.post('/session', (req, res) => {
  sessionController.create(req, res)
})

routes.post('/users', (req, res) => {
  userController.create(req, res)
})

export default routes
